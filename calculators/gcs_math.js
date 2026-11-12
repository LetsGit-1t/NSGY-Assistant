export function calculateGCS(eyes, verbal, motor, intubated = false ) {
	//Validate inputs
	const valid_e = Number.isInteger(eyes) && Number(eyes) > 0 && Number(eyes) < 5
	const valid_v = Number.isInteger(verbal) && Number(verbal) > 0 && Number(verbal) < 6
	const valid_m = Number.isInteger(motor) && Number(motor) > 0 && Number(motor) < 7
	//Determine verbal testable (i.e. intubated)
	let verbal_score = {
		if (intubated) {
			verbal_score = 1
		}
		else {
		verbal_score = valid_v
	}
	}

	//calculate total
	if (!valid_e) {
		valid_e = null
	}
	
	if (!valid_v) {
		valid_v = null
	}
	
	if (!valid_m) {
		valid_m = null
	}

	const total = valid_e + valid_v + verbal_score;

	//generate display
	const result = intubated ? '${total}T' : total;
	//return result
	return {
		total: total,
		display: result,
		components: {
			eye: eyes,
			verbal: verbal_score,
			motor: motor,
		},
		intubated: intubated,
	}
}
