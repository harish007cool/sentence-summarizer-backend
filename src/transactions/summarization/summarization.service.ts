import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SummarizationService {
  async summarizeBatch(sentences: string[]): Promise<string[]> {
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    const apiKey = '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'; // Replace with your Groq API key

    const summaries = [];
    for (const sentence of sentences) {
      console.log('sentence------------------', sentence);

      try {
        const response = await axios.post(
          apiUrl,
          {
            model: "llama3-8b-8192",
            messages: [
              { role: "system", content: "You are a helpful assistant that summarizes text." },
              { role: "user", content: `Summarize the following text: ${sentence}` }
            ]
          },
          { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        summaries.push(response.data.choices[0].message.content); // Adjust based on actual response format
      } catch (error) {
        //console.error('Error summarizing sentence:', error);
        console.log('------------------', error.response.data);
        summaries.push('Error generating summary');
      }
    }

    return summaries;
  }
}
