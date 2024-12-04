# OpenAI Conversations

This repository collects learnings from the `conversations.json` file that [ChatGPT exports](https://help.openai.com/en/articles/7260999-how-do-i-export-my-chatgpt-history-and-data).

## Schema

The [Schema for `conversations.json` in TypeScript](./conversations.ts) is (partially) captured.

This is how I generated it:

- Run [`uv run src/sample_conversations.py conversations.json 2000`](./src/sample_conversations.py) to sample 2,000 conversations from my history
  - Replace `mapping`, which is {UUID: Message} mapping with an array of messages to simplify schema detection
- Paste it in [QuickType](https://app.quicktype.io/) with Language: TypeScript (Interfaces only, Use union type instead of enum, Use string instead of enum for string enums with single value, Acronymn Naming Style: Original) and save the result as `conversation.ts`
- Improve the results:
  - Run it a few more times
  - Normalizing the generated TypeScript with [`deno run -A src/normalize_typescript.ts conversation.ts`](./src/normalize_typescript.ts) and then Prettier
  - Diff with the existing schema to see if there are any relevant diffs

## Observations

- ChatGPT uses [Private Unicode Control Characters for Citations and Content References](./private-unicode-control-characters.md)

## Samples

Here are a few sample conversations to understand how the conversations are stored.

- [Amazon Nova Model Strengths](https://chatgpt.com/share/675019e2-e848-800c-934b-f0a10be7d5b0) [JSON](./samples/amazon-nova-model-strengths.json) has search and news citations
- [Karunanidhi Political Family Overview](https://chatgpt.com/share/675019c0-d6c4-800c-8156-4803ef5038dc) [JSON](./samples/karunanidhi-political-family-overview.md) shows an image inline
- [CSV Data Analysis Insights](https://chatgpt.com/share/67501a85-fc14-800c-a2b5-bf0a248f8317) [JSON](./samples/csv-data-analysis-insights.json) is on o1-preview
- [India Map with Khargone](https://chatgpt.com/share/67501b8d-0204-800c-add0-c28001802f50) [JSON](./samples/india-map-with-khargone.json) has Dall-E images
- [Node.js Network Libraries](https://chatgpt.com/share/...) [JSON](./samples/nodejs-network-libraries.json) has a system message
