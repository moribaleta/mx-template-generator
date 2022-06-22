# mx-template-generator
## NPM package that you can use to create your own template files

how to install
```
npm i mx-template-generator -global
```
#how to setup
1. create config file
![Screen Shot 2022-06-22 at 7 48 13 AM](https://user-images.githubusercontent.com/13190143/174914678-9c710225-be15-40a2-aa2f-557efba8e7b3.png)
it is supposed to be an array containing an element with a `templateName` and `templateFile`
  * `templateName` - will be the name of the generated file
    * you need to include the ${folderName} this will be the destination of the folder created  
  * `templateFile` - this is the template that the file will be copied from
    *  ![Screen Shot 2022-06-22 at 7 48 42 AM](https://user-images.githubusercontent.com/13190143/174914722-34f33e54-e60c-4072-af72-81aff0508e19.png)
    * `${fileName}` will be replaced by the filename supplied from the command

3. set the destination path of config
  * locate `settings.json` inside the npm package
  * change it to the location the config.js is located
  * ![Screen Shot 2022-06-22 at 7 46 57 AM](https://user-images.githubusercontent.com/13190143/174914642-6f25375c-e12e-4197-9241-b1b2909670eb.png)

#how to use
1. locate the directory where you want to create your files
  * example: `cd /Volumes/Passport/projects/sample-redux-toolkit/sampleApp/src/feature`
2. write mx-template-generator --name="<ADD YOUR FILENAME HERE>"
  * 
3. npm package will automatically create the files from the `config.js` provided
4. the name of the folder will have the first letter in lowercase 
  * example: --name="SampleFolder" foldername will be "sampleFolder"

### Others
  feel free to message me here on https://github.com/moribaleta/ 
  if there are any other concerns create an issue ticket 