const tf = require('@tensorflow/tfjs')
import { inv } from 'mathjs'
export default function useLinearRegression(){
    
    const m = tf.variable(tf.scalar(Math.random()))
    const c = tf.variable(tf.scalar(Math.random()))

    const predict = (years)=>{
        return tf.tidy(()=>{
            return years.mul(m).add(c)
        })
    }

    const error = (prices , predictPrices)=>{
        return prices.sub(predictPrices).square().mean()
    }
    
    const getPredictPrice = ( newYears , newPrices )=>{
        newPrices = newPrices.map(e => 
            Number(e.toFixed(1))
        );
        
        const newYearsTF = tf.tensor1d(newYears)
        const newPricesTF = tf.tensor1d(newPrices)

        const learningRate = 0.001
        const optimizer = tf.train.sgd(learningRate)
        
        for (let i = 0; i < 8000 ; i++){
            optimizer.minimize(()=> error(newPricesTF , predict(newYearsTF)))
        }

        const predictPrices = predict(newYearsTF)
        error(predictPrices , newPrices).print()

        return { predictPrices: Array.from(predictPrices.dataSync()) } 
    }

    const getFasterPredictPrice = (newYears , newPrices) =>{
        const years = tf.tensor(newYears)
        const prices = tf.tensor(newPrices ,[years.shape[0],1])
        const ones = tf.ones([years.shape[0]])
        const stack = tf.stack([years,ones]).transpose()
        
        const mul = tf.matMul(stack.transpose() , stack)

        const inverse = tf.tensor(inv(mul.arraySync()) , [2,2])

        const W = tf.matMul(tf.matMul(inverse , stack.transpose()) , prices)
        const z = tf.matMul(stack , W )

        error(prices , Array.from(z.dataSync())).print()

        return { predictPrices: Array.from(z.dataSync()) } 
    }

    return {
        getPredictPrice,
        getFasterPredictPrice,
    }
}