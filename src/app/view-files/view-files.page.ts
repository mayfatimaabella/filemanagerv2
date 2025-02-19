import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.page.html',
  styleUrls: ['./view-files.page.scss'],
  standalone: false,
})
export class ViewFilesPage implements OnInit {

  fileList: string[] = [];

  constructor(
    private actionSheetCtrller: ActionSheetController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    try {
      const list = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });

      this.fileList = list.files.map((file) => file.name ?? file);
    } catch (error) {
      alert('Error loading file list');
    }
  }

  async openActionSheet(fileName: string) {
    const actionSheet = await this.actionSheetCtrller.create({
      header: `File: ${fileName}`,
      buttons: [
        {
          text: 'Open/Edit',
          icon: 'document',
          handler: () => {
            this.openFile(fileName);
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteFile(fileName);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ]
    });

    await actionSheet.present();
  }

  openFile(fileName: string) {
    this.navCtrl.navigateForward(['/open-file'], {
      queryParams: { fileName }
    });
  }

  async deleteFile(fileName: string) {
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Documents,
      });
      alert('File deleted successfully');
      this.loadFiles();
    } catch (error) {
      alert('Error deleting file');
    }
  }
}
