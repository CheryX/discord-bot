
/**
 * 
 * @param {object} interaction 
 * @returns object
 */
function getArgs(interaction) {

	let options = interaction.options._hoistedOptions
	let commandArgs = {}
	if (options != null) {

		for (let i = 0; i < options.length; i++) {
			commandArgs[options[i].name] = options[i].value
		}

	}

	return commandArgs;
	  
}

export default getArgs;