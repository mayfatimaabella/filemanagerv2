import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.page.html',
  styleUrls: ['./open-file.page.scss'],
  standalone: false,
})
export class OpenFilePage implements OnInit {
  fileName: string = '';
  fileContent: string | any = '';
  fileList: string[] = [];
  isEditing: boolean = false;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['fileName']) {
        this.fileName = params['fileName'];
        this.loadFileContent();
        this.isEditing = true;

      }
    });
  }

  async createFile() {
    if (!this.fileName.trim()) {
      alert('Please enter a filename.');
      return;
    }

    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: this.fileContent || '',
        directory: Directory.Documents,
      });

      alert('File created successfully!');
      this.navCtrl.navigateForward('/view-files');
    } catch (error) {
      console.error('Error creating file', error);
    }
  }

  async updateFiles() {
    if (!this.fileName.trim()) {
      alert('File name is required');
      return;
    }

    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: this.fileContent,
        directory: Directory.Documents, 
      });

      alert('File updated successfully.');
      this.navCtrl.navigateForward('/view-files');
    } catch (error) {
      alert('Error updating file');
    }
  }

  async loadFileContent() {
    try {
      const result = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Documents,
      });

      this.fileContent = result.data;
    } catch (error) {
      console.error('Error reading file', error);
    }
  }

  async refreshFileList() {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });

      this.fileList = result.files.map(file => file.name);
    } catch (error) {
      console.error('Error reading directory', error);
    }
  }
}
