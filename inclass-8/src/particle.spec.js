import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.mass).to.be.ok
        expect(p.position).to.be.ok      
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
       
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ velocity: [0.5, -0.5],acceleration:[1.0,1.0]})
        const { velocity } = update(p, 1.0) 
        expect(velocity).to.eql([1.5, 0.5])
       
    })

    it('particles should wrap around the world', () => {
        const canvas={width:400,height:600}
        const p = particle({ position: [800, 1000], velocity: [1, 2],acceleration:[2,-1]})
        const { position } = update(p, 5.0, canvas) 
        expect(position[0]).to.be.above(0)
        expect(position[0]).to.be.below(canvas.width)
        expect(position[1]).to.be.above(0)
        expect(position[1]).to.be.below(canvas.height)
        
    })

})
