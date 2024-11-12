import { Controller, Post, Body } from '@nestjs/common';
import { SummarizationService } from './summarization.service';

@Controller('summarize')
export class SummarizationController {
  constructor(private readonly summarizationService: SummarizationService) {}

  @Post()
  
  async summarizeText(
    @Body('text') text: string,
    @Body('batchSize') batchSize: number,
  ) {
    console.log('test--------------------------');

    const sentences = text.match(/[^.!?]+[.!?]/g) || [];
    const batches = [];
    for (let i = 0; i < sentences.length; i += batchSize) {
      batches.push(sentences.slice(i, i + batchSize));
    }

    const summarizedBatches = await Promise.all(
      batches.map(async (batch) => ({
        original: batch,
        summaries: await this.summarizationService.summarizeBatch(batch),
      })),
    );

    return summarizedBatches;
  }
}