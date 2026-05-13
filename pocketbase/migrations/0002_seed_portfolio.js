migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('portfolio_items')
    const items = [
      {
        title: 'E-commerce XP',
        description: 'Plataforma de e-commerce de alta conversão construída com React e Node.js.',
        category: 'Web',
      },
      {
        title: 'App Delivery',
        description: 'Aplicativo de delivery rápido e intuitivo para iOS e Android.',
        category: 'Mobile',
      },
      {
        title: 'Sistema de Gestão ERP',
        description: 'ERP completo para pequenas empresas com relatórios em tempo real.',
        category: 'Web',
      },
    ]
    for (const item of items) {
      try {
        app.findFirstRecordByData('portfolio_items', 'title', item.title)
      } catch (_) {
        const record = new Record(col)
        record.set('title', item.title)
        record.set('description', item.description)
        record.set('category', item.category)
        app.save(record)
      }
    }
  },
  (app) => {
    // no-op
  },
)
