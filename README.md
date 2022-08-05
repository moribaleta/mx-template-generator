# mx-template-generator

## NPM package that you can use to create your own template files

# how to install
```
npm i mx-template-generator -global
```

#how to setup

1. create config file
- `mx-template-generator` supports nested folder structure
  - your `config.js` file can support multiple templates
    - NOTE:  if `--template` is not given it will default to `template`
    ```
    module.exports = {
      template: {},
      template2: {},
      template3: {}
    }
    ```
  - scheme for folder :
    ```
    {
      name: '<FOLDER>',
      type: 'folder',
      files: []
    }
    ```
  - scheme for file: 
    ```
    {
      name: '<FILENAME>',
      type: 'file',
      location: '<PATH OF THE FILE LOCATION FROM THE TEMPLATES>'
    }
    ```
- lib/templates/config.js
![Screen Shot 2022-06-24 at 11 29 27 AM](https://user-images.githubusercontent.com/13190143/175456471-fe640eb5-2240-4678-b7d4-244c6c0edcbf.png)]

2. File Creation
  - `${fileName}` will be replaced by the filename supplied from the command `--name`
  ![Screen Shot 2022-06-22 at 7 48 42 AM](https://user-images.githubusercontent.com/13190143/174914722-34f33e54-e60c-4072-af72-81aff0508e19.png)

3. set the destination path of config
  - locate `settings.json` inside the npm package
  - change it to the location the config.js is located
  ![Screen Shot 2022-06-22 at 7 46 57 AM](https://user-images.githubusercontent.com/13190143/174914642-6f25375c-e12e-4197-9241-b1b2909670eb.png)

#how to use

1. open terminal or cmd
2. locate the directory where you want to create your files

- example: `cd /Volumes/Passport/projects/sample-redux-toolkit/sampleApp/src/feature`

3. write `mx-template-generator --name="ADD YOUR FILENAME HERE"`
4. npm package will automatically create the files from the `config.js` provided
5. the name of the folder will have the first letter in lowercase

- example: `--name="SampleFolder"` foldername will be `sampleFolder`

# Commands #
* `mx-template-generate` 
  - used to execute the file creation
* `--name` 
  - used to define the name, folder and class name
* `--template` 
  - used to specify the template to use
* `--force` 
  - used to override file creation
* `--debug`
  - this will display console log messages
* `--config`
  - this will set the path of the config file given 
  - ### NOTE: 
    - this is only intended for local node project install not `global`
    - this will locate the root node project path and append the config path given

### Others

feel free to message me here on https://github.com/moribaleta/
if there are any other concerns create an issue ticket