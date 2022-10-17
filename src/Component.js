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

	#path_inside_components = this.#get_inner_path()
	#file_name = this.#path_inside_components.split("/").at(-1)
	#style_type = this.#argument_style_type()
	#ext = this.#argument_ext()
	#full_path = `components/${this.#path_inside_components}`.toLowerCase()


	#js_file_name = `${this.#file_name}.${this.#ext}`
	#style_file_name = `${this.#file_name}.${this.#style_type}`.toLowerCase()

	#success_message = [
		`${green}Success:${reset}`,
		`[ Component`,
		`${blue}${this.#path_inside_components}${reset}`,
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

	#get_inner_path() {
		const path = this.#findArg([/^--component=.+$/,/^-c=.+$/])
		this.#isExist(path)

		const arrPaths = path.split("/")
		const component_name = arrPaths.pop()

		return arrPaths.join("/")
			+ "/"
			+ component_name[0].toUpperCase() + component_name.slice(1)
	}

	#argument_style_type () {
		return this.#findArg([/^--style-type=.+$/,/^-st=.+$/]) || "css"
	}

	#argument_ext() {
		return this.#findArg([/^--ext=.+$/,/^-e=.+$/]) || "jsx"
	}

	async #create_folder() {
		const file_name = join(cwd(), this.#full_path)
		await mkdir(file_name, {recursive: true})
	}

	async #getTemplate () {
		const template = await readFile(join(__dirname , "template"))
		return (
			template.toString()
				.replace("$style", `${this.#file_name}.${this.#style_type}`.toLowerCase())
				.replaceAll("$Name", this.#file_name)
		)
	}

	async #create_file_component(template) {
		const file_name = join(cwd(), this.#full_path, this.#js_file_name)
		await writeFile(file_name, template)
	}

	async #create_file_style() {
		const file_name = join(cwd(), this.#full_path, this.#style_file_name)
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
