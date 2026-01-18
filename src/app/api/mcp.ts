import { createMcpHandler } from 'mcp-handler';

const mcpHandler = createMcpHandler(
  (server) => {
    server.tool(
      'hello',
      'A simple tool that returns a friendly greeting.',
      {},
      async () => {
        return {
          content: [
            {
              type: 'text',
              text: 'Hello from the Steel Motion Vercel MCP server!',
            },
          ],
        };
      }
    );
  },
  {
    serverInfo: {
      name: 'steel-motion-mcp',
      version: '1.0.0',
    },
  }
);

export const POST = mcpHandler;
