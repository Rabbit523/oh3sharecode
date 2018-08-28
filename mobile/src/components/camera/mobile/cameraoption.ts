import { Camera } from '@ionic-native/camera';
export class CameraOptionHelper {
    static getcameraop_TakePhotoCrop(camera: Camera): any {
        return {
            allowEdit: true,
            sourceType: camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: camera.MediaType.ALLMEDIA,
            destinationType: camera.DestinationType.FILE_URI,
            correctOrientation: true
        }
    }

    static getcameraop_TakePhoto(camera: Camera): any {
        return {
            quality: 50,
            destinationType: camera.DestinationType.FILE_URI,
            encodingType: camera.EncodingType.JPEG,
            mediaType: camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: camera.PictureSourceType.CAMERA,
            correctOrientation: true
        }
    }
    static getcameraop_choosePhoto(camera: Camera): any {
        return {
            quality: 50,
            destinationType: camera.DestinationType.FILE_URI,
            sourceType: 0,
            encodingType: camera.EncodingType.JPEG,
            mediaType: camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        }
    }
    static getcameraop_chooseVideo(camera: Camera): any {
        return {
            quality: 50,
            destinationType: camera.DestinationType.FILE_URI,
            sourceType: 0,
            mediaType: 1,
            allowEdit: true,
            correctOrientation: true
        }
    }
}