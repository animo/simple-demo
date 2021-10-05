import { Agent, AutoAcceptCredential, HttpOutboundTransport, InitConfig, LogLevel } from "@aries-framework/core";
import { SOVRIN_STAGING_NET } from "./utils";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";
import { startServer } from "@aries-framework/rest";
import { TestLogger } from "./logger";

const endpoint = process.env.AGENT_ENDPOINT ?? "http://localhost:5001";
const port = process.env.AGENT_PORT ?? 5001;

const run = async () => {
  const logger = new TestLogger(LogLevel.debug);
  const agentConfig: InitConfig = {
    label: "Animo Demo Agent",
    walletConfig: {
      id: "Animo Demo Agent",
      key: "Animo Demo Agent",
    },
    poolName: "pool-holder",
    genesisTransactions: SOVRIN_STAGING_NET,
    publicDidSeed: "4bd9c0200f4ba2ad8069d8dcea1c9ea9",
    logger: logger,
    endpoints: [endpoint],
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    useLegacyDidSovPrefix: true,
  };

  const agent = new Agent(agentConfig, agentDependencies);

  const httpInbound = new HttpInboundTransport({
    port: Number(port),
  });

  agent.registerInboundTransport(httpInbound);

  agent.registerOutboundTransport(new HttpOutboundTransport());

  await agent.initialize();

  await startServer(agent, 5000);
};

run();
