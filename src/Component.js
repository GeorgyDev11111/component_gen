import { fileURLToPath } from 'url'
import { join, dirname } from "path"
import { cwd, argv, exit } from "process"
import { open, writeFile, readFile, mkdir } from "fs/promises"
import { red, blue, green, cyan, reset } from './color_console.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

class Component {
  #err_message = [
    `${red}Error:${reset}`, 
    `[ ${red}invalid arguments${reset}`,
    "May be", 
    `${cyan}switching language keyboard${reset}`,
    "help you ]"
  ].join(" ")

  #component = this.#argument_component()
  #style_ext = this.#argument_style()

  #folder_name = `components/${this.#component}`.toLowerCase()
  #js_file_name = `${this.#component}.jsx`
  #style_file_name = `${this.#component}.${this.#style_ext}`.toLowerCase()

  #success_message = [
    `${green}Success:${reset}`,
    `[ Component`,
    `${blue}${this.#component}${reset}`,
    "created! ]"
  ].join(" ")

  #find_command(regexp) {
    return argv.filter((el) => (
        el.match(regexp[0]) || el.match(regexp[1])
    )).toString() 
  }
  
  #isExist (value) {
    if(!value) {
      console.log(this.#err_message)
      exit(1)
    } 
  }

  // --key=value -> value
  #findArg (regexp) {
    const command = this.#find_command(regexp)
    return command.slice(command.indexOf("=") + 1) 
  }

  #argument_component() {
    let arg = this.#findArg([/^--component=.+$/,/^-c=.+$/])
    this.#isExist(arg)
    return arg = arg[0].toUpperCase() + arg.slice(1)
  }

  #argument_style () {
    return this.#findArg([/^--style-type=.+$/,/^-st=.+$/]) || "css" 
  }

  async #create_folder() {
    const file_name = join(cwd(), this.#folder_name)
    await mkdir(file_name, {recursive: true})
  }
  
  async #getTemplate () {
    const template = await readFile(join(__dirname , "template"))
    return ( 
      template.toString()
        .replace("$style", `${this.#component}.${this.#style_ext}`.toLowerCase())
        .replaceAll("$Name", this.#component) 
    )
  }

  async #create_file_component(template) {
    const file_name = join(cwd(), this.#folder_name, this.#js_file_name)
    await writeFile(file_name, template)
  }

  async #create_file_style() {
    const file_name = join(cwd(), this.#folder_name, this.#style_file_name)
    await open(file_name,"w")
  }

  #success_log() {
    console.log(this.#success_message)
    exit(0)
  }

  async generate () {
    await this.#create_folder()
    
    const template = await this.#getTemplate()
    await this.#create_file_component(template)

    await this.#create_file_style()
    
    this.#success_log()
  }
}

export { Component }
