import {Queue} from "bullmq";

const connection = {
    host: 'paybank-redis',
    port: 6379
    //password: 'paybank'
}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, {connection})

export const getJob = async () => {
    const jobs = await queue.getJobs()// busca todos os jobs na fila
    console.log(jobs) // exibe todos os jobs na fila 
    console.log(jobs[0].data.code) // exibe o código do primeiro job na fila
    console.log('Jobs na fila:', jobs.length) // exibe a quantidade de jobs na fila   
    if (jobs.length === 0) { 
        console.log('Nenhum job encontrado na fila.') 
        return null
    }
    return jobs[0].data.code // retorna o código do primeiro job na fila
}

export const cleanJobs = async () => {
    await queue.obliterate() // limpa todos os jobs na fila
}          