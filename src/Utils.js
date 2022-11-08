import { exit, argv } from "process"


class Utils {
	upperFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	isExist(target, err_msg) {
		if(!target) {
			console.log(err_msg)
			exit(1)
		}
	}

	success_log(msg) {
		console.log(msg)
		exit(0)
	}

	#find_command(regexp) {
		return argv.filter((el) => (
			el.match(regexp[0]) || el.match(regexp[1])
		)).toString()
	}

	findArg (regexp) {
		const command = this.#find_command(regexp)
		return command.slice(command.indexOf("=") + 1) 	// --key=value -> value
	}
}

const utils = new Utils()

export { utils }
