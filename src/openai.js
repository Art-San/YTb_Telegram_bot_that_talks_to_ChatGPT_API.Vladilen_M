import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI {
    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey
        })
        this.openai = new OpenAIApi(configuration)
    }

    chat() {}

    async transcription(filepath) {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            )
            return response.data.text
        } catch (e) {
            console.log('Error while transcription', e.message)
        }
    }
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))

// import { Configuration, OpenAIApi } from 'openai'
// class OpenAI {
//     constructor() {
//         const configuration = new Configuration({
//             apiKey: process.env.OPENAI_API_KEY
//         })
//         const openai = new OpenAIApi(configuration) // заменили на THIS чтоб было доступen в рамках данного класа
//     }
//     chat() {}
//     transcription() {}
// }
// export const openai = new OpenAI()
