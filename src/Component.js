import { cwd } from "process"
import { utils } from './Utils.js'
import { fileURLToPath } from 'url'
import { join, dirname } from "path"
import { open, writeFile, readFile, mkdir } from "fs/promises"
import { red, blue, green, cyan, reset } from './color_console.js'


const __dirname = dirname(fileURLToPath(import.meta.url))


class Component {
	/* vars */
    #err_message = `${red}Error:${reset} [ ${red}invalid arguments${reset} May be ${cyan}switching language keyboard${reset} help you ]`
	#path_inside_components = this.#get_inner_path()
	#arg_empty_style = "null"
	#file_name = this.#path_inside_components.split("/").at(-1)
	#style_type = this.#argument_style_type()
	#ext = this.#argument_ext()
	#isIndexFile = this.#argument_index()
	#js_file_name = `${this.#file_name}.${this.#ext}`
	#style_file_name = `style.${this.#style_type}`.toLowerCase()
	#full_path = `components/${this.#path_inside_components}`.toLowerCase()
	#success_msg = `${green}Success:${reset} [ Component: ${blue}${this.#path_inside_components}${reset} created! ]`
	

	#get_inner_path() {
		const path = utils.findArg([/^--component=.+$/,/^-c=.+$/])
		utils.isExist(path, this.#err_message)

		const arrPaths = path.split("/")
		const component_name = arrPaths.pop()

		return arrPaths.join("/") + "/" + utils.upperFirstLetter(component_name)
	}

	// arguments cli
	#argument_style_type () {
		return utils.findArg([/^--style-type=.+$/,/^-st=.+$/]) || "css"
	}

	#argument_ext() {
		return utils.findArg([/^--ext=.+$/,/^-e=.+$/]) || "jsx"
	}

	#argument_index () {
		return utils.findArg([/^--index$/,/^-i$/]) ? true : false
	}
	
	// templates
	async #getTemplate () {
		const template = await readFile(join(__dirname , "templates", "template"))
		return (
			template.toString()
				.replace("$style", () => {
					return this.#style_type !== this.#arg_empty_style
						? `import "./style.${this.#style_type}"`.toLowerCase()
						: ""
				})
				.replaceAll("$Name", this.#file_name)
		)
	}

	async #getTemplateIndex () {
		const template = await readFile(join(__dirname, "templates" ,"templateIndex"))
		return template.toString().replace("$path", `${this.#file_name}`)
	}
	// to create files/folders
	async #create_folder() {
		const file_name = join(cwd(), this.#full_path)
		await mkdir(file_name, {recursive: true})
	}

	async #create_file_component() {
		const template = await this.#getTemplate()
		const file_name = join(cwd(), this.#full_path, this.#js_file_name)
		await writeFile(file_name, template)
	}

	async #create_file_style() {
		if(this.#style_type !== this.#arg_empty_style) {
			const file_name = join(cwd(), this.#full_path, this.#style_file_name)
			await open(file_name,"w")
		}
	}

	async #create_index_file() {
		if(this.#isIndexFile){
			const template = await this.#getTemplateIndex()
			const file_name = join(cwd(), this.#full_path, `index.${this.#ext == "tsx" ? "ts" : "js"}`)
			await writeFile(file_name, template)
		}
	}
	// Api
	async generate () {
		await this.#create_folder()
		await this.#create_file_component()
		await this.#create_file_style()
		await this.#create_index_file()

		utils.success_log(this.#success_msg)
	}
}

export { Component }
