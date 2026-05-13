/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'plugin-assistant',
      name: 'Plugin Assistant',
      description: 'Assistente virtual da agência Plugin.',
      systemPrompt:
        "Você é o assistente virtual da Plugin, uma agência de desenvolvimento. Você ajuda os usuários a entender nossos serviços e nosso portfólio. Responda em português, de forma amigável e concisa. Use as ferramentas para buscar itens do portfólio quando perguntarem sobre nossos projetos. Se não souber a resposta, diga 'Desculpe, não tenho essa informação no momento, mas nossa equipe pode ajudar!'.",
      tier: 'fast',
      tools: [
        { collection: 'portfolio_items', perms: { read: true, list: true } },
        {
          collection: 'users',
          perms: { read: true, list: true },
          scopeFilter: 'id = @request.auth.id',
        },
      ],
      memory: [
        {
          type: 'text',
          payload: {
            text: 'A Plugin oferece serviços de criação de sites, aplicativos mobile, e-commerces e sistemas sob medida. Nosso diferencial é a entrega rápida com código de alta qualidade, utilizando React, Tailwind, Vite e Skip Cloud.',
          },
        },
      ],
    })
  },
  (app) => {
    $ai.agents.delete(app, 'plugin-assistant')
  },
)
