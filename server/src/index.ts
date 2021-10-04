import { Agent, AutoAcceptCredential, HttpOutboundTransport, InitConfig, LogLevel } from "@aries-framework/core";
import { connect } from "ngrok";
import { BCOVRIN_TEST_GENESIS } from "./utils";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";
import { startServer } from "@aries-framework/rest";
import { TestLogger } from "./logger";

const run = async () => {
  const logger = new TestLogger(LogLevel.debug);

  const endpoint = await connect(3001);
  const agentConfig: InitConfig = {
    label: "Animo",
    walletConfig: {
      id: "Animo",
      key: "Animo",
    },
    poolName: "pool-holder",
    genesisTransactions: BCOVRIN_TEST_GENESIS,
    publicDidSeed: "testtesttesttesttesttesttesttest",
    logger: logger,
    endpoints: [endpoint],
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    useLegacyDidSovPrefix: true,
  };

  const agent = new Agent(agentConfig, agentDependencies);

  const httpInbound = new HttpInboundTransport({
    port: 3001,
  });

  agent.registerInboundTransport(httpInbound);

  agent.registerOutboundTransport(new HttpOutboundTransport());

  await agent.initialize();

  await startServer(agent, 3000);
};

run();
