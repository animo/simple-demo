import {
  Agent,
  AutoAcceptCredential,
  ConnectionEventTypes,
  ConnectionInvitationMessage,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
} from "@aries-framework/core";
import { BCOVRIN_TEST_GENESIS } from "./utils";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";
import { startServer } from "@aries-framework/rest";
import { TestLogger } from "./logger";

import { connect } from "ngrok";

const run = async () => {
  const port = process.env.AGENT_PORT ?? 5001;
  const endpoint = process.env.AGENT_ENDPOINT ?? (await connect(5001));

  const logger = new TestLogger(LogLevel.test);
  const agentConfig: InitConfig = {
    label: "Animo Demo Agent",
    walletConfig: {
      id: "Animo Demo Agent",
      key: "Animo Demo Agent",
    },
    poolName: "pool-holder",
    genesisTransactions: BCOVRIN_TEST_GENESIS,
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

  httpInbound.app.get("/invitation", async (req: any, res: any) => {
    if (typeof req.query.d_m === "string") {
      const invitation = await ConnectionInvitationMessage.fromUrl(req.url.replace("d_m=", "c_i="));
      res.send(invitation.toJSON());
    }
    if (typeof req.query.c_i === "string") {
      const invitation = await ConnectionInvitationMessage.fromUrl(req.url);
      res.send(invitation.toJSON());
    } else {
      const { invitation } = await agent.connections.createConnection();

      res.send(invitation.toUrl({ domain: endpoint + "/invitation", useLegacyDidSovPrefix: true }));
    }
  });

  // eslint-disable-next-line no-console
  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, (d) => console.log(d));

  await agent.initialize();

  await startServer(agent, 5000);
};

run();
