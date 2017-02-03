const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
    
	position[0]=position[0]+velocity[0]*delta+1/2*acceleration[0]*delta*delta
	position[1]=position[1]+velocity[1]*delta+1/2*acceleration[1]*delta*delta
    if (canvas){
        while (position[0] > canvas.width){
            position[0] -= canvas.width
         }
        while (position[0] < 0){
            position[0] += canvas.width
        }
        while (position[1] > canvas.height){
            position[1] -= canvas.height
        }
        while (position[1] < 0) {
            position[1] += canvas.height
        } 
    }
    
	velocity[0]+=acceleration[0]*delta
	velocity[1]+=acceleration[1]*delta

    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
