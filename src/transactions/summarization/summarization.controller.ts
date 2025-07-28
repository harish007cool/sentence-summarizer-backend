import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SummarizationService } from './summarization.service';
import { SummarizeTextDto } from './dto/summarize-text.dto';

@Controller('summarize')
export class SummarizationController {
  constructor(private readonly summarizationService: SummarizationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // enables validation + transformation
  async summarizeText(@Body() body: SummarizeTextDto) {
    const { text, batchSize } = body;
    console.log('Received text:', text);

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
