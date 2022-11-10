import { cwd } from "process"
import { utils } from './Utils.js'
import { fileURLToPath } from 'url'
import { join, dirname } from "path"
import { open, writeFile, readFile, mkdir } from "fs/promises"
import { red, blue, green, cyan, reset } from './colorConsole.js'


const __dirname = dirname(fileURLToPath(import.meta.url))


class Component {
	/* vars */
	#pattern_name     = "$name"
	#pattern_path     = "$path"
	#pattern_style    = "$style"
	#arg_empty_style  = "null"
	#templates_folder = "templates"

	#arg_ext   = this.#find_arg_ext()
	#arg_path  = this.#find_arg_path()
	#arg_style = this.#find_arg_style()
	#arg_index = this.#find_arg_index()

    #err_message = `${red}Error:${reset} [ ${red}invalid arguments${reset} May be ${cyan}switching language keyboard${reset} help you ]`
	#path_inside_components = this.#get_inner_path()
	#file_name = this.#path_inside_components.split("/").at(-1)

	#full_path       = `components/${this.#path_inside_components}`.toLowerCase()
	#success_msg     = `${green}Success:${reset} [ Component: ${blue}${this.#path_inside_components}${reset} created! ]`
	#js_file_name    = `${this.#file_name}.${this.#arg_ext}`
	#style_file_name = `style.${this.#arg_style}`.toLowerCase()


	#get_inner_path () {
		const path = this.#arg_path
		utils.isExist(path, this.#err_message)

		const array_paths = path.split("/")
		const component_name = array_paths.pop()

		return array_paths.join("/") + "/" + utils.toUpperFirstLetter(component_name)
	}

	// find arguments
	#find_arg_style () {
		return utils.findArg([/^--style-type=.+$/,/^-st=.+$/]) || "css"
	}

	#find_arg_ext () {
		return utils.findArg([/^--ext=.+$/,/^-e=.+$/]) === "tsx" ? "tsx" : "jsx"
	}

	#find_arg_index () {
		return utils.findArg([/^--index$/,/^-i$/]) ? true : false
	}

	#find_arg_path () {
		return utils.findArg([/^--component=.+$/,/^-c=.+$/])
	}

	// templates
	async #get_template () {
		const template = await readFile(join(__dirname , this.#templates_folder, "template"))

		const replacement = () =>
			this.#arg_style !== this.#arg_empty_style
				? `import "./style.${this.#arg_style}"`.toLowerCase()
				: ""
		return (
			template.toString()
				.replace(this.#pattern_style, replacement)
				.replaceAll(this.#pattern_name, this.#file_name)
		)
	}

	async #get_template_index () {
		const template = await readFile(join(__dirname, this.#templates_folder , "templateIndex"))
		return template.toString().replace(this.#pattern_path, `${this.#file_name}`)
	}

	// to create files/folders
	async #create_folder () {
		const file_name = join(cwd(), this.#full_path)
		await mkdir(file_name, {recursive: true})
	}

	async #create_file_component () {
		const template = await this.#get_template()
		const file_name = join(cwd(), this.#full_path, this.#js_file_name)
		await writeFile(file_name, template)
	}

	async #create_file_style () {
		if(this.#arg_style !== this.#arg_empty_style) {
			const file_name = join(cwd(), this.#full_path, this.#style_file_name)
			await open(file_name,"w")
		}
	}

	async #create_file_index () {
		if(this.#arg_index){
			const template = await this.#get_template_index()
			const file_name = join(cwd(), this.#full_path, `index.${this.#arg_ext}`)
			await writeFile(file_name, template)
		}
	}

	// Api
	async generate () {
		await this.#create_folder()
		await this.#create_file_component()
		await this.#create_file_style()
		await this.#create_file_index()

		utils.successLog(this.#success_msg)
	}
}

export { Component }
