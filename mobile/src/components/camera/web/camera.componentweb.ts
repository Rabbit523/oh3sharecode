import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cameracomponentweb',
  templateUrl: 'camera.componentweb.html'
})
export class CameraComponentWeb {

  @Output("pathArry") fileArry = new EventEmitter;
  
  readAndPreview(file) {
    var preview = document.querySelector('#preview');
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        preview.appendChild(image);
      }, false);
      reader.readAsDataURL(file);
    }
  }
  previewFiles() {
    var preview = document.querySelector('#preview');
    preview.innerHTML="";
    let files: any = document.querySelector('input[type=file]');
    if (files.files) {
      [].forEach.call(files.files, this.readAndPreview);
    }
    //这里必须要多写一次
    var tempfiles = [];
    for (let i = 0; i < files.files.length; i++) {
      let _file = files.files[i];
      tempfiles.push(_file);
    };
    this.fileArry.emit(tempfiles);
  }
}
