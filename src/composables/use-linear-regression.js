const tf = require('@tensorflow/tfjs')
import { inv } from 'mathjs'
export default function useLinearRegression(){
    
    const m = tf.variable(tf.scalar(Math.random()))
    const b = tf.variable(tf.scalar(Math.random()))

    const predict = (days)=>{
        return tf.tidy(()=>{
            return days.mul(m).add(b)
        })
    }

    const error = (prices , predictPrices)=>{
        return prices.sub(predictPrices).square().mean()
    }
    
    const getPredictPrice = ( newDays , newPrices )=>{
        newPrices = newPrices.map(e => 
            Number(e.toFixed(1))
        );
        
        console.log(newDays);
        console.log(newPrices);

        const newDaysTF = tf.tensor1d(newDays)
        const newPricesTF = tf.tensor1d(newPrices)

        newDaysTF.print()
        newPricesTF.print()
        // const days = tf.tensor1d([0,1,2,3,4,5,6])
        // const prices = tf.tensor1d([10,10.25,11,12,12.15,13,13.78])
        
        const learningRate = 0.001
        const optimizer = tf.train.sgd(learningRate)
        
        for (let i = 0; i < 8000 ; i++){
            optimizer.minimize(()=> error(newPricesTF , predict(newDaysTF)))
        }
        
        m.print()
        b.print()

        const predictPrices = predict(newDaysTF)
        error(predictPrices , newPrices).print()

        return { predictPrices: Array.from(predictPrices.dataSync()) } 
    }

    const getFasterPredictPrice = (newDays , newPrices) =>{
        const days = tf.tensor(newDays)
        const prices = tf.tensor(newPrices ,[days.shape[0],1])
        const ones = tf.ones([days.shape[0]])
        const stack = tf.stack([days,ones]).transpose()
        
        const mul = tf.matMul(stack.transpose() , stack)

        const inverse = tf.tensor(inv(mul.arraySync()) , [2,2])

        const W = tf.matMul(tf.matMul(inverse , stack.transpose()) , prices)
        const z = tf.matMul(stack , W )
        z.print()
        return { predictPrices: Array.from(z.dataSync()) } 
    }

    return {
        getPredictPrice,
        getFasterPredictPrice,
    }
}