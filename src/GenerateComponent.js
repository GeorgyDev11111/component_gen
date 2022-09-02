import { fileURLToPath } from 'url'
import { join, dirname } from "path"
import { cwd, argv, exit } from "process"
import { open, writeFile, readFile, mkdir } from "fs/promises"


class Component {
  // привычная константа текущей директории
  #__dirname = dirname(fileURLToPath(import.meta.url));
  // место папки, откуда запустился скрипт
  #dirname__ = cwd()

  // аргументы
  #component = this.#findArg([/--component=/,/-c/])
  #style_ext = this.#findArg([/--style-type=/,/-st/]) || "css"

  // найти аргумент параметра вида: --key=value
  #findArg (regexp) {
    const command = argv.filter((el) => regexp[0].test(el) || regexp[1].test(el) ).toString() 
    return command.slice(command.indexOf("=") + 1)
  }

  async generate () {
    // если настройки переданы неправильно
    if(!this.#component) {
      console.log(`\x1b[31mError:\x1b[0m [\x1b[31m invalid arguments\x1b[0m May be\x1b[36m switching language keyboard\x1b[0m help you ]`)
      exit(1)
    }

    let file_name
    // создание папки компонентов
    file_name = join(this.#dirname__, "components", this.#component)
    await mkdir(file_name,{recursive: true})
    // подготовка шаблона
    let template = await readFile(join(this.#__dirname, "template"))
    template = template.toString().replaceAll("$Name", this.#component)
    // создание файла .jsx
    file_name = join(this.#dirname__, "components",this.#component, this.#component + ".jsx")
    await writeFile(file_name, template)
    //...
    
    // создание стилей
    file_name = join(this.#dirname__, "components", this.#component,`${this.#component}.${this.#style_ext}`)
    await open(file_name,"w")

    // Успешное создание
    console.log(`\x1b[32mSuccess:\x1b[0m [ Компонент \x1b[34m${this.#component}\x1b[0m создан! ]`)
  }
}

export { Component }
