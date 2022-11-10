import { exit, argv } from "process"


class Utils {
	toUpperFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	isExist(target, err_msg) {
		if(!target) {
			console.log(err_msg)
			exit(1)
		}
	}

	successLog(msg) {
		console.log(msg)
		exit(0)
	}

	#find_command(regexps) { //: string | undefined
		return argv.filter((el) =>
			regexps.find((regexp) => el.match(regexp))
		)[0]?.toString()
	}

	findArg (regexp) {
		const command = this.#find_command(regexp) || ""
		return command.slice(command.indexOf("=") + 1) 	// --key=value -> value
	}
}

const utils = new Utils()

export { utils }
