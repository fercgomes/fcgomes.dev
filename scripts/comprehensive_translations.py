#!/usr/bin/env python3
"""
Generate comprehensive translations for all languages.
This creates full translations for pt-BR, es, fr, and sv.
"""

import json

# Read English as base
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# Comprehensive translations for pt-BR
pt_br_translations = {
    'journey': {
        'startingPoint': {
            'title': 'Ponto de Partida: A Stack Monstruosa',
            'period': 'Maio 2023',
            'intro': 'Quando me juntei como CTO em maio de 2023, herdei uma infraestrutura complexa que não correspondia à escala ou necessidades do negócio:',
            'points': [
                '<count>7</count> microsserviços em Python rodando em AWS Lambda',
                'Uma API separada em Java',
                '<count>3</count> bancos de dados diferentes: Neo4j, MySQL e DynamoDB',
                'App Flutter e plataforma web React',
                'Custos AWS de R$600/mês para um punhado de usuários sem monetização'
            ],
            'conclusion': 'Não havia raciocínio lógico por trás dessas escolhas—foi construído incrementalmente com base no que era conhecido na época, sem considerar escalabilidade ou eficiência de custos.'
        },
        'firstMigration': {
            'title': 'A Primeira Migração: Simplificação',
            'period': '2023',
            'intro': 'Minha primeira grande decisão como CTO foi simplificar a infraestrutura. Sem monetização e com baixo uso, a configuração complexa não era justificada. Propus e executei:',
            'points': [
                'API unificada única em NestJS, construída do zero',
                'PostgreSQL como única fonte da verdade',
                'Reescrevi a plataforma web em Next.js para melhor SEO',
                'Hospedado inteiramente no Fly.io para infraestrutura gerenciada e acessível'
            ],
            'conclusion': 'Escrevi todo o código da nova API e liderei a migração. Esta base permitiu iteração rápida de produto e nos preparou para o crescimento.'
        },
        'awsMigration': {
            'title': 'Migração de Volta para AWS',
            'period': '2024',
            'intro': 'Conforme o produto escalou e o uso cresceu, precisávamos de mais controle e escalabilidade do que a plataforma gerenciada poderia fornecer. Orquestrei uma migração completa de volta para AWS:',
            'points': [
                'Deploy ECS Fargate: Containers Dockerizados com capacidades de autoscaling para lidar com picos de tráfego',
                'Infraestrutura de nível de produção: RDS Postgres, ElastiCache Redis, CloudFront CDN, subnets privadas com bastion hosts',
                '100% Infrastructure as Code: Toda infraestrutura gerenciada com Terraform para reprodutibilidade e controle de versão',
                'Migração zero-downtime: Migração cuidadosamente planejada e executada sem interrupção de serviço, mantendo 100% de uptime durante a transição',
                'Escalabilidade e controle: Infraestrutura projetada para suportar 100K+ usuários com controle total sobre escalonamento, monitoramento e gerenciamento de custos'
            ],
            'conclusion': 'Esta migração forneceu a base necessária para escalar eficientemente mantendo controle de custos e excelência operacional.'
        },
        'monetization': {
            'title': 'Experimentos de Monetização',
            'period': '2023-2024',
            'intro': 'Encontrar monetização sustentável foi desafiador. A maioria dos materiais eram provas antigas, criando preocupações de direitos autorais. Tentamos múltiplas abordagens:',
            'points': [
                'Parcerias B2B: Banners e integrações de quadro de empregos. Receita cresceu de R$200 para R$650/mês, mas exigia distribuição manual e trabalhosa através de grupos universitários.',
                'Vendas de crédito B2C: Usuários podiam comprar créditos para acessar materiais. Algumas vendas, mas não escalável.',
                'Primeiro modelo de assinatura: Assinatura de acesso ilimitado. Apenas 3 assinantes—não escalou.',
                'AI Question Scan + nova assinatura: Este foi o avanço. Lançado junto com o novo modelo de assinatura, impulsionou crescimento consistente de assinantes.'
            ]
        },
        'ambassadorProgram': {
            'title': 'O Programa de Embaixadores',
            'period': '2023 - Presente',
            'intro': 'Através de interações com usuários, descobrimos que o principal incentivo para compartilhar materiais era o puro instinto de ajudar colegas—quase como um símbolo de status. O programa de embaixadores aproveitou este comportamento natural:',
            'points': [
                'Onboarding pessoal: Inicialmente, fizemos chamadas com cada candidato para entender melhor nosso público-alvo',
                'Modelo de compensação: Recompensado em dinheiro por uploads de materiais (marcos) e visualizações. Embaixadores tinham um dashboard com saldo que podia ser sacado uma vez que o limite mínimo fosse atingido',
                'Expansão nacional: Quando os vídeos viralizaram, embaixadores vieram de todo o Brasil. Crescemos nas principais universidades federais, exatamente nosso alvo. Atualmente: 600 embaixadores ativos, 4K lista de espera',
                'Desafio técnico: Construí sistema orientado a eventos com ledger transacional. Mais tarde refatorei para suportar duas versões concorrentes do programa durante a migração, migrando lentamente usuários entre versões'
            ]
        },
        'teamBuilding': {
            'title': 'Construindo a Equipe e Estabelecendo Processos',
            'period': '2024',
            'intro': 'Conforme o produto cresceu, assumi a responsabilidade de escalar a equipe de produto e estabelecer processos claros:',
            'points': [
                'Contratação e onboarding: Recrutei e integrei novos membros da equipe de produto, criando materiais e processos abrangentes de onboarding',
                'Documentação de processos de desenvolvimento: Estabeleci fluxos de trabalho de desenvolvimento claros, do planejamento à implantação, com exemplos práticos e checklists',
                'Manual interno: Criei um sistema de documentação vivo cobrindo processos, modelos de PRD, princípios de qualidade e diretrizes de uso de ferramentas',
                'Padrões de qualidade: Defini padrões de codificação, requisitos de teste e processos de revisão para garantir consistência em toda a equipe',
                'Mentoria e compartilhamento de conhecimento: Realizei sessões regulares de transferência de conhecimento e mentorei membros da equipe sobre melhores práticas técnicas e decisões de arquitetura'
            ],
            'conclusion': 'Estes processos permitiram que a equipe escalasse efetivamente mantendo altos padrões de qualidade e alinhamento na direção técnica.'
        },
        'directSales': {
            'title': 'Vendas Diretas com Landing Pages',
            'period': '2025',
            'intro': 'Criamos o sistema de checkout especificamente para permitir um modelo de vendas diretas para assinaturas. Esta abordagem mudou fundamentalmente como adquirimos e convertemos usuários:',
            'points': [
                'Campanhas de anúncios Meta: Múltiplas campanhas direcionando tráfego para várias landing pages em diferentes plataformas',
                'Landing pages distribuídas: Landing pages espalhadas pelo Framer e Lovable, cada uma redirecionando para o sistema de checkout unificado',
                'Rastreamento completo de atribuição: Todas as variantes rastreadas de ponta a ponta, permitindo medição precisa do desempenho da campanha e taxas de conversão',
                'Funil de vendas simplificado: Usuários compram antes de usar, tornando a atribuição trivial e o escalonamento de receita previsível',
                'Escalonamento de receita previsível: O funil simplificado e a atribuição clara permitiram otimização baseada em dados e crescimento de receita confiável'
            ],
            'conclusion': 'Este modelo de vendas diretas transformou nossa estratégia de aquisição, tornando mais fácil medir ROI, otimizar campanhas e escalar receita de forma previsível.'
        },
        'technicalEvolution': {
            'title': 'Evolução Técnica e Desafios',
            'earlyDecisions': {
                'title': 'Decisões Técnicas Iniciais',
                'points': [
                    'Miniaturas PDF: Inicialmente armazenadas miniaturas binárias em colunas Postgres usando GraphicsMagick. Funcionou bem inicialmente, mas conforme os materiais cresceram, migrei para S3 com campos de URL. Mantive compatibilidade da API redirecionando para URLs S3',
                    'Sistema de reações: Começou com simples like/dislike em uma tabela de reações com consultas COUNT. Como o Instagram teve, isso ficou lento. Desnormalizei com campos like_count atualizados via triggers. Mais tarde evoluiu para sistema de classificação de 1-5 estrelas'
                ]
            },
            'architectureDebt': {
                'title': 'Débito de Arquitetura e Melhorias',
                'points': [
                    'Complexidade crescente: Conforme as funcionalidades se expandiram, os serviços ficaram grandes e fortemente acoplados. A lógica de negócios estava misturada com infraestrutura. Consultas KnexJS ficaram massivas, tornando testes de lógica de negócios quase impossíveis',
                    'Melhorias na experiência do desenvolvedor: Melhorei tempos de rebuild, hot reload, replicabilidade de ambiente. Criei sistema de seed a partir de dados de produção anonimizados, baixei materiais estáticos de amostra e alternei entre eles no Minio para economizar espaço—sem dependência S3 para dev',
                    'Refatoração futura: Backend ainda precisa de grande refatoração. Ideal seria mais próximo da arquitetura DDD para separar adequadamente as preocupações'
                ]
            }
        }
    },
    'education': {
        'degree': 'Ciência da Computação',
        'university': 'UFRGS - Universidade Federal do Rio Grande do Sul',
        'period': '2017 - 2024',
        'description': 'Graduação completa em Ciência da Computação. Focado em empreendedorismo e desenvolvimento full-stack durante todo o programa. Durante a pandemia, fiz múltiplos cursos para adquirir habilidades necessárias para construir produtos do zero. Não busquei estágios tradicionais, em vez disso, foquei em tempo integral no Fokvs por 3 anos, aprendendo e construindo extensivamente.',
        'background': 'Formação: Formei o ensino médio em 2012 no Colégio Sinodal Barão do Rio Branco em Cachoeira do Sul. Sempre sonhei com empreendedorismo. Durante a pandemia, fiz cursos sobre blockchain, desenvolvimento web, gestão de produtos e computação em nuvem para construir as habilidades necessárias para criar algo do zero.',
        'research': {
            'title': 'Experiência em Pesquisa',
            'scientificInitiation': 'Iniciação Científica: Grupo de processamento paralelo e distribuído. Algoritmos paralelos para arquiteturas heterogêneas usando biblioteca StarPU para processamento paralelo CPU/GPU',
            'entrepreneurialInitiation': 'Iniciação Empreendedora: Desenvolvimento de aplicativo de entrega de farmácia',
            'tcc': 'TCC (Trabalho de Conclusão de Curso): Pesquisa em Business Process Management (BPM) sobre eficiência de LLM para gerar descrições de processos de negócios BPMN comparado a métodos tradicionais de NLP'
        },
        'otherExperiences': {
            'title': 'Outras Experiências',
            '2012': '2012: Formei o ensino médio no Colégio Sinodal Barão do Rio Branco em Cachoeira do Sul',
            '2013': '2013: Programa de Intercâmbio Juvenil do Rotary - Um ano vivendo na Suécia como estudante de intercâmbio. Esta experiência contribuiu para habilidades quase fluentes em sueco.',
            '2015': '2015: Dois semestres de Biologia na UFRGS antes de mudar para Ciência da Computação. Este período de exploração ajudou a esclarecer a direção da carreira.',
            'entrepreneurshipMarathon': 'Maratona de Empreendedorismo (SEDETEC UFRGS): Projeto Decoreba - Duolingo para vestibulares. 2º lugar. Desenvolvi todo o app, web e backend. Apesar do reconhecimento, o projeto nunca foi lançado devido à inexperiência, mas foi um aprendizado valioso que preparou para o Fokvs.'
        }
    },
    'skills': {
        'categories': {
            'Backend': 'Backend',
            'Frontend': 'Frontend',
            'Architecture': 'Arquitetura',
            'Infrastructure': 'Infraestrutura',
            'AI/ML': 'IA/ML',
            'Payments': 'Pagamentos',
            'Data': 'Dados',
            'Tools': 'Ferramentas',
            'Leadership': 'Liderança'
        }
    },
    'media': {
        'items': {
            'fokvs-web-demo': {
                'title': 'Demo da Plataforma Web Fokvs',
                'description': 'Demonstração completa do aplicativo web Fokvs mostrando funcionalidades e recursos principais'
            },
            'fokvs-app-demo': {
                'title': 'Demo do App Mobile Fokvs',
                'description': 'Demonstração dos recursos e experiência do usuário do aplicativo mobile Fokvs'
            },
            'churn-reduction': {
                'title': 'Redução de Churn',
                'description': 'Taxa de churn declinou de 50% para 10% ao longo de 2025',
                'alt': 'Gráfico de linha mostrando declínio da taxa de churn de 50% em janeiro de 2025 para 10% até o final do ano'
            },
            'mau-growth': {
                'title': 'Crescimento de Usuários Ativos Mensais',
                'description': 'Evolução de MAU e WAU mostrando crescimento significativo começando em março de 2025',
                'alt': 'Gráfico de linha mostrando crescimento de Usuários Ativos Mensais e Usuários Ativos Semanais de 2024 a 2025'
            },
            'subscribers-growth': {
                'title': 'Crescimento de Assinaturas Ativas',
                'description': 'Assinaturas cresceram de 0 para 300+ assinantes ativos',
                'alt': 'Gráfico de linha mostrando crescimento de assinaturas ativas de dezembro de 2023 a julho de 2025, atingindo mais de 300 assinantes'
            },
            'team-photo': {
                'title': 'Equipe Fokvs',
                'description': 'Nossa equipe no escritório Tecnopuc em Porto Alegre',
                'alt': 'Membros da equipe Fokvs no escritório Tecnopuc'
            },
            'anyfunnel-dashboard': {
                'title': 'Dashboard de Analytics AnyFunnel',
                'description': 'Projeto de data lake com interface de chat com IA para consultar dados de funil de vendas e gerar visualizações',
                'alt': 'Dashboard de analytics AnyFunnel mostrando visualizações de funil de vendas e interface de consulta de dados'
            }
        },
        'videoNotSupported': 'Seu navegador não suporta a tag de vídeo.'
    }
}

# Function to deep merge
def deep_merge(base, updates):
    for key, value in updates.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            deep_merge(base[key], value)
        else:
            base[key] = value

# Apply pt-BR translations
with open('messages/pt-BR.json', 'r', encoding='utf-8') as f:
    pt_br = json.load(f)

deep_merge(pt_br, pt_br_translations)

with open('messages/pt-BR.json', 'w', encoding='utf-8') as f:
    json.dump(pt_br, f, ensure_ascii=False, indent=2)

print("Updated pt-BR.json with comprehensive translations")

