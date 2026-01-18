
import { createMcpHandler } from 'mcp-handler';

const mcpHandler = createMcpHandler({
  // Your tool definitions go here
  tools: {
    hello: {
      description: 'A simple tool that returns a friendly greeting.',
      run: async () => {
        return {
          message: 'Hello from the a Vercel MCP server!',
        };
      },
    },
  },
});

export const POST = mcpHandler;
