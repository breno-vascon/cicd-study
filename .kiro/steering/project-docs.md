---
inclusion: always
---

# Calendários Service — Visão Geral

## O que é

Microserviço NestJS + MongoDB que gerencia calendários acadêmicos e seus eventos. Centraliza informações de períodos, cursos, marcas e instituições.

## Arquitetura de Camadas

O projeto segue Clean Architecture com as seguintes camadas:

```
src/
├── presentation/     # Controllers e DTOs (entrada/saída HTTP)
├── domain/           # Regras de negócio (usecases, entities, repositories interfaces)
├── infra/            # Implementações técnicas (adapters, schemas)
├── app/              # Configuração NestJS (modules, providers, decorators)
└── shared/           # Utilitários compartilhados (constants, interfaces, utils)
```

### Fluxo de uma requisição

```
Controller → UseCase → Repository (interface) → Adapter (implementação) → MongoDB
```

### Camada Presentation

Responsável pela interface HTTP. Contém controllers e DTOs.

**Estrutura de pastas:**
```
src/presentation/
├── {feature-name}/
│   ├── {feature-name}.controller.ts
│   └── {feature-name}.controller.spec.ts
└── dtos/
    ├── {feature-name}.dto.ts          # Input DTO
    └── {feature-name}-response.dto.ts # Output DTO
```

**Controller:** Recebe requisição, valida permissões via decorator, chama usecase e retorna DTO de resposta.

```typescript
@Controller('eventos')
export class CreateEventController {
  constructor(
    @Inject(ICreateEventUsecaseSymbol)
    private readonly createEventUsecase: ICreateEventUsecase,
  ) { }

  @Post()
  async execute(
    @ValidateUser({ allowedProducts: [...] }) _user: IUser,
    @Body() dto: CreateEventDto,
  ): Promise<EventResponseDto> {
    const { event } = await this.createEventUsecase.execute({ ... });
    return { ... };
  }
}
```

### Camada Domain

Contém regras de negócio puras, sem dependências de frameworks.

**Estrutura de pastas:**
```
src/domain/
├── entities/
│   └── {entity-name}.entity.ts
├── repositories/
│   └── {action-name}.repository.ts    # Interface apenas
├── usecases/
│   └── {feature-name}/
│       ├── {feature-name}.usecase.ts
│       ├── {feature-name}.usecase.spec.ts
│       └── {feature-name}.types.ts    # Input, Output, Interface do usecase
└── fixtures/
    └── {entity-name}.fixture.ts       # Fixtures para testes
```

**UseCase:** Orquestra a lógica de negócio usando repositories injetados.

```typescript
@Injectable()
export class CreateEventUsecase implements ICreateEventUsecase {
  constructor(
    private readonly createEventRepository: CreateEventRepository,
    private readonly findEventByTitleRepository: FindEventByTitleRepository,
  ) { }

  async execute(input: CreateEventInput): Promise<CreateEventOutput> {
    // Regras de negócio aqui
  }
}
```

**Types:** Define interface do usecase, input e output tipados.

```typescript
export const ICreateEventUsecaseSymbol = Symbol('ICreateEventUsecaseSymbol');

export interface CreateEventInput { ... }
export interface CreateEventOutput { ... }
export interface ICreateEventUsecase {
  execute(input: CreateEventInput): Promise<CreateEventOutput>;
}
```

**Repository (interface):** Contrato para acesso a dados, sem implementação.

```typescript
export interface CreateEventRepository {
  execute(event: EventEntity): Promise<EventEntity>;
}
```

### Camada Infra

Implementações técnicas que satisfazem as interfaces do domain.

**Estrutura de pastas:**
```
src/infra/
├── adapters/
│   └── {action-name}/
│       ├── {action-name}.mongoose.adapter.ts
│       └── {action-name}.mongoose.adapter.spec.ts
├── schemas/
│   └── {entity-name}.schema.ts
└── utils/
    ├── {util-name}.util.ts
    └── {util-name}.util.spec.ts
```

**Adapter:** Implementa interface do repository usando tecnologia específica (Mongoose).

```typescript
export class CreateEventMongooseAdapter implements CreateEventRepository {
  constructor(private readonly model: Model<EventDocument>) { }

  async execute(event: EventEntity): Promise<EventEntity> {
    const created = await this.model.create(event);
    return { ... };
  }
}
```

### Camada App

Configuração e wiring do NestJS.

**Estrutura de pastas:**
```
src/app/
├── modules/
│   ├── features/
│   │   └── {feature-name}.module.ts
│   └── infra/
│       └── mongodb.module.ts
├── providers/
│   └── {domain}/
│       └── {feature-name}/
│           └── {feature-name}.usecase.provider.ts
└── decorators/
    └── {decorator-name}.decorator.ts
```

**Provider:** Factory que instancia usecase com seus adapters.

```typescript
export const CreateEventUsecaseProvider: Provider = {
  provide: ICreateEventUsecaseSymbol,
  useFactory(model: Model<EventDocument>): CreateEventUsecase {
    const createEventRepository = new CreateEventMongooseAdapter(model);
    const findEventByTitleRepository = new FindEventByTitleMongooseAdapter(model);
    return new CreateEventUsecase(createEventRepository, findEventByTitleRepository);
  },
  inject: [getModelToken(Event.name)],
};
```

**Module:** Agrupa controllers, providers e imports relacionados.

```typescript
@Module({
  imports: [MongooseModule.forFeature([...])],
  controllers: [CreateEventController],
  providers: [CreateEventUsecaseProvider],
  exports: [CreateEventUsecaseProvider],
})
export class EventosModule { }
```

## Collections

### Entidades do Domínio

O projeto utiliza duas entidades distintas para eventos:

| Entidade              | Descrição                                                                 | Collection MongoDB |
| --------------------- | ------------------------------------------------------------------------- | ------------------ |
| `EventEntity`         | Evento "solto" na collection `eventos`. Possui code, title, type, status. | `eventos`          |
| `CalendarEventEntity` | Evento vinculado a um calendário. Possui dados contextuais como datas.    | (embedded)         |

### calendarios

| Campo      | Tipo            | Descrição                                                                 |
| ---------- | --------------- | ------------------------------------------------------------------------- |
| _id        | ObjectId        | Identificador único gerado pelo MongoDB                                   |
| brand      | String          | Marca associada (ESTACIO, WYDEN, IBMEC, IDOMED)                           |
| period     | String          | Período acadêmico (ex: 2025.1)                                            |
| courseType | String          | Tipo do curso (ex: GRADUACAO, POS_GRADUACAO)                              |
| IES        | Array\<String\> | Instituições de ensino (obrigatório para IDOMED)                          |
| course     | Array\<String\> | Cursos associados (obrigatório para IDOMED)                               |
| status     | String (enum)   | `enable` ou `disable`                                                     |
| events     | Array\<Objeto\> | Lista de eventos vinculados ao calendário                                 |

**Chave única:** A combinação `brand + period + courseType + IES + course` deve ser única entre calendários com `status = enable`.

#### Objeto events[] (dentro de calendarios)

| Campo       | Tipo                   | Descrição                     |
| ----------- | ---------------------- | ----------------------------- |
| code        | String (único, base62) | Identificador único do evento |
| title       | String (único)         | Título do evento              |
| type        | String                 | Tipo do evento                |
| startDate   | Date                   | Data de início                |
| endDate     | Date                   | Data de fim                   |
| description | String                 | Descrição (max 240 chars)     |
| link        | String                 | URL válida (http/https)       |

### eventos (collection separada)

Armazena eventos de forma independente. Primeiro cria-se aqui, depois vincula-se a calendários com informações contextuais.

| Campo  | Tipo                   | Descrição                     |
| ------ | ---------------------- | ----------------------------- |
| code   | String (único, base62) | Identificador único do evento |
| title  | String (único)         | Título do evento              |
| type   | String                 | Tipo do evento                |
| status | String (enum)          | `enable` ou `disable`         |

### calendarAudits

| Campo        | Tipo                 | Descrição                            |
| ------------ | -------------------- | ------------------------------------ |
| calendarId   | ObjectId             | ID do calendário auditado (indexado) |
| modifiedAt   | Date                 | Timestamp da modificação             |
| updateMethod | String (enum)        | Método da alteração (`MANUAL_EDIT`)  |
| userEmail    | String               | Email do usuário que realizou a ação |
| generalInfo  | Array\<FieldChange\> | Alterações nos campos do calendário  |
| events       | Array\<EventChange\> | Alterações nos eventos do calendário |

## Padrão de Response de Erro

```json
{ "statusCode": 400|404|500, "message": "descrição", "error": "Bad Request|Not Found|Internal Server Error" }
```

## Consumidores

| Consumidor  | Uso                                   |
| ----------- | ------------------------------------- |
| App         | Buscar calendário, Buscar programação |
| SAVA        | Buscar calendário, Buscar programação |
| Cerebrum FE | CRUD de eventos e calendários         |

## Dependências Externas

| Serviço         | Descrição                            | Endpoint                                          |
| --------------- | ------------------------------------ | ------------------------------------------------- |
| Microsserviços  | Aulas agendadas do aluno             | GET {MSBaseURL}/cerebrum/v1/alunos/{mat}/agendas  |
| Sirius          | Agendamentos em polo                 | GET {SiriusBaseURL}/students/:id/exams/status     |
