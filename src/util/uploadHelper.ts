import Compress from '@yireen/squoosh-browser'
import {
  defaultPreprocessorState,
  defaultProcessorState,
  encoderMap,
} from '@yireen/squoosh-browser/dist/client/lazy-app/feature-meta'
const uploadHelper = (file, folder) => {
  return new Promise(async (resolve) => {
    const compress = new Compress(file, {
      encoderState: {
        type: 'mozJPEG',
        options: encoderMap.mozJPEG.meta.defaultOptions,
      },
      processorState: defaultProcessorState,
      preprocessorState: defaultPreprocessorState,
    })
    const compressFile = await compress.process()
    const base64File: any = await fileByBase64(compressFile)
    const orginal_base64: any = await fileByBase64(file)
    resolve({
      name: `${file.name.substring(0, file.name.lastIndexOf('.'))}_${createHash(
        6
      )}`,
      orginal_size: file.size,
      compress_size: compressFile.size,
      base64data: base64File.replace(/^data:image\/\w+;base64,/, ''),
      base64: base64File,
      orginal_base64data: orginal_base64.replace(
        /^data:image\/\w+;base64,/,
        ''
      ),
      orginal_base64: orginal_base64,
      folder: folder,
      ext: getFileExtendingName(file.name),
    })
  })
}
const fileByBase64 = (file) => {
  return new Promise(async (resolve) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e: any) {
    resolve(e.target.result)
    }
  })
}
function getFileExtendingName(filename) {
  var reg = /\.[^\.]+$/
  var matches = reg.exec(filename)
  if (matches) {
    return matches[0]
  }
  return ''
}
function createHash(hashLength) {
  return Array.from(Array(Number(hashLength) || 24), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('')
}
export { uploadHelper, fileByBase64 }