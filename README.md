# thinkNXG Assistant Core

> Talk to your thinkNXG ERP site. TAC lets Claude, ChatGPT, and other
> MCP-ready LLMs work directly with your invoices, customers, stock,
> workflows, and custom apps — inside your thinkNXG ERP permissions, with
> every call logged.

[![Version](https://img.shields.io/github/v/release/thinknxg/thinkNXG-Assistant-Core?label=version)](https://github.com/thinknxg/thinkNXG-Assistant-Core/releases)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue)](https://pypi.org/project/frappe-assistant-core)
[![License](https://img.shields.io/badge/license-AGPL--3.0-green)](LICENSE)
[![MCP](https://img.shields.io/badge/MCP-2025--06--18-orange)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/tools-24-brightgreen)](https://docs.thinknxg.com/thinknxgassistantcore/api/tool-reference)
[![Docs](https://img.shields.io/badge/docs-thinknxg.com-blue)](https://docs.thinknxg.com/thinknxgassistantcore)

[![CI](https://github.com/thinknxg/thinkNXG-Assistant-Core/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknxg/thinkNXG-Assistant-Core/actions/workflows/ci.yml)
[![thinkNXG Cloud](https://img.shields.io/badge/thinkNXG%20Cloud-Marketplace-blue)](https://thinknxgcloud.com/marketplace/apps/thinknxg_assistant_core)
[![Stars](https://img.shields.io/github/stars/thinknxg/thinkNXG-Assistant-Core?style=social)](https://github.com/thinknxg/thinkNXG-Assistant-Core/stargazers)
[![Forks](https://img.shields.io/github/forks/thinknxg/thinkNXG-Assistant-Core?style=social)](https://github.com/thinknxg/thinkNXG-Assistant-Core/network/members)
[![Sponsors](https://img.shields.io/github/sponsors/buildswithpaul?logo=github)](https://github.com/sponsors/buildswithpaul)

---

## New in TAC 3.0: TAC Chat

TAC 3.0 introduces **TAC Chat** — an opt-in, in-thinkNXG AI chat assistant
powered by **FAC Cloud**, our managed service. What it does, what it
costs and how to sign up: **<https://fac-suite.com>**.

TAC now offers two ways to use it:

- **BYO-LLM (MCP server, free)** — the original TAC. Connect any
  MCP-ready LLM client (Claude Desktop, Cursor, ChatGPT desktop, etc.)
  to your thinkNXG data over MCP. You bring the LLM, you pay your own
  LLM bill, nothing leaves your stack. Ships enabled by default.
- **TAC Chat (in-thinkNXG chat UI, SaaS)** — opt-in. A native chat
  widget on every Desk page plus a full-screen SPA at `/copilot`,
  powered exclusively by **FAC Cloud**. One subscription covers LLM
  access across providers, conversation memory, RAG, and workflow
  automation. Ships **disabled by default**. See
  <https://fac-suite.com>.

The split is intentional: BYO-LLM keeps the existing free MCP path
untouched; TAC Chat is the managed experience for teams that want the
chat inside thinkNXG without wiring up their own LLM keys. See
[TAC Chat](#fac-chat) below for full details.

---

## What you get

Once TAC is installed, your team can ask an LLM for things they'd
normally do by hand:

> *"Show me overdue invoices from our top five customers."*
>
> *"Update this lead's status to Qualified and set next action date to
> Monday."*
>
> *"Run the monthly revenue report and summarise the top movers."*
>
> *"How much stock of SKU-1234 do we have across all warehouses?"*

Behind that simple interaction, TAC exposes **24 built-in tools** for
the things your team does every day — document CRUD, search, reports,
workflows, analytics, file extraction, and dashboards. Admins can
publish **Skills** (reusable instructions that teach the LLM how to
handle a specific job) and **Prompt Templates** (saved starting points
users can pick from the admin UI) so answers stay consistent and use
the right reports. The LLM authenticates over **OAuth 2.0** as a real
thinkNXG ERP user, so it only sees data that user can already see in the
desk. Every call is recorded in the **Assistant Audit Log**.

It's a thinkNXG app, so developers can extend the toolset from their own
thinkNXG apps through a hook — your data model, your business logic,
scoped per your app.

Your data stays in your site. You control which LLM connects.

---

## Quick start

Two install paths depending on how you run thinkNXG.

### On thinkNXG Cloud (recommended)

1. Go to your site's **Apps** tab in the thinkNXG Cloud dashboard.
2. Find **thinkNXG Assistant Core** in the marketplace and click **Install**.
3. thinkNXG Cloud installs and migrates the app for you.

Marketplace: <https://thinknxgcloud.com/marketplace/apps/thinknxg_assistant_core>

### On self-hosted bench

```bash
cd frappe-bench
bench get-app https://github.com/thinknxg/thinkNXG-Assistant-Core
bench --site <your-site> install-app frappe_assistant_core
```

**Node 22.12+ is needed only to build the TAC Chat UI.** The assets are
built on your instance rather than shipped pre-built, so a bench on an
older Node will fail that build step. Upgrade Node to 22.12 or newer and re-run
`bench build`. A site using TAC purely as an MCP server does not need
this.

Requires thinkNXG v15 or v16 and Python 3.10+.

### Connect your LLM

Once installed, the same four steps work for any MCP-compatible client.
Example shown for Claude Desktop:

1. Go to **Desk → TAC Admin** and copy the **MCP Endpoint URL**.
2. In **Claude Desktop → Settings → Connectors → Add Custom Connector**,
   paste the URL and click **Add**.
3. Click **Connect**, log in with your thinkNXG ERP account, and authorize.
4. Ask Claude something — for example, *"List all customers created this
   month."*

For ChatGPT, Claude Web, and MCP Inspector walkthroughs, see the
[Quick Start](https://docs.thinknxg.com/thinknxgassistantcore/getting-started/quick-start) on the docs site.

---

## TAC Chat

**TAC Chat is an opt-in, SaaS-powered chat experience that ships inside
TAC.** Where the MCP server lets external LLM clients (Claude Desktop,
Cursor, ChatGPT desktop) talk to your thinkNXG data with your own LLM
keys, TAC Chat brings the conversation inside thinkNXG itself — a widget
on every Desk page and a full-screen SPA at `/copilot` — powered by a
**FAC Cloud** subscription.

Plans, pricing and sign-up live at **<https://fac-suite.com>**; this
section covers only what the app itself does.

### Two ways to use TAC

| Option | What it is | LLM | Cost | Where the chat lives |
|---|---|---|---|---|
| **BYO-LLM (MCP server)** | The original TAC. Exposes thinkNXG data over MCP to any MCP-ready client. | You bring your own (Anthropic, OpenAI, Gemini, Bedrock, etc.) | Free. You pay your own LLM bill. | In your external MCP client (Claude Desktop, Cursor, etc.). No chat UI inside thinkNXG. |
| **TAC Chat (SaaS)** | In-thinkNXG chat widget + `/copilot` SPA. Streaming, tool use, attachments, history, memory, RAG, workflows. | Managed by FAC Cloud. One subscription, multiple providers. | Subscription required. Sign up flow runs inside the chat UI. | Inside thinkNXG Desk. |

These are **mutually exclusive at the chat layer**: the in-thinkNXG chat
UI is only available through FAC Cloud. There is no BYO-LLM
path for TAC Chat — if you want to bring your own LLM, use the MCP
server.

Both options share the same plugin registry, the same
`Assistant Audit Log`, and the same OAuth-based authentication.
Enabling TAC Chat does NOT change anything for your MCP clients — both
can run side by side.

### Enabling TAC Chat

1. Open **TAC** from the thinkNXG apps screen.
2. Enable chat.

That is the whole thing — **no `bench restart`**. The chat hooks are
registered unconditionally and every consumer checks the toggle at
request time, so other workers pick up the new state on their next
request.

A discovery banner on the Desk landing page will also walk admins
through enabling chat — it appears once per admin and can be dismissed.

After enabling:
- The chat widget appears in the corner of thinkNXG Desk pages.
- The full-screen SPA is reachable at `/copilot`.
- The first time a user opens chat, they walk through a one-time
  onboarding that registers the tenant with FAC Cloud and links it to
  a subscription.

### What TAC Chat is NOT

- It is **not required** for MCP server users. Skip it entirely if
  Claude Desktop or another MCP client is your only access pattern —
  the free MCP path keeps working exactly as before.
- It is **not a BYO-LLM frontend**. The in-thinkNXG chat UI talks only
  to FAC Cloud. If you want to bring your own LLM keys, the MCP server
  is the path for that.
- It does **not change** TAC's tool catalog. The same 24 built-in
  tools are available to MCP clients and to TAC Chat alike.
- It does **not store conversations off-site without consent**.
  Conversation history lives in your thinkNXG database; only the LLM
  request payload (messages + tool call results) is forwarded to
  FAC Cloud to generate the next response.

---

## Skills and Prompt Templates

TAC gives you two ways to shape what the LLM does with your data.

**Skills** are reusable instructions you give the LLM — stored as
`FAC Skill` documents inside your site. Each skill has a `skill_id`,
a description, and markdown content describing how to handle a specific
task using the available tools. The LLM lists skills on connect and
pulls them on demand, so every time someone asks about, say, the
monthly sales close, the answer is consistent and uses the right
reports.

**Prompt Templates** are saved starting points for the *user's* side
of the conversation — Jinja-templated prompts with typed arguments
(dropdowns, dates, booleans). Authors publish them from the admin page;
users pick one, fill in the arguments, and the rendered prompt is sent
to the LLM. Use them for frequently-asked analyses like "Sales
Analysis", "Manufacturing Analysis", or your own industry-specific
workflows.

Both live in thinkNXG, so they're version-controlled with your site,
shareable across users, and can be shipped by external thinkNXG apps
through the `assistant_skills` hook.

---

## Tools at a glance

TAC ships 22 tools across four plugins: **Core** (thinkNXG operations),
**Data Science** (Python execution, analytics, file extraction),
**Visualization** (dashboards and charts), and **Custom Tools** (the
registry for tools contributed by external apps).

| Category | Tools |
|---|---|
| Documents | `get_document`, `list_documents`, `create_document`, `update_document`, `delete_document`, `document_action` |
| Search | `search_documents` (global, DocType-scoped, or Link value), plus `search` / `fetch` for ChatGPT connectors |
| Reports | `report_list`, `report_requirements`, `generate_report` |
| Approvals | `get_pending_approvals`, `run_workflow` |
| Schema | `get_doctype_info` |
| Analytics | `run_python_code`, `run_database_query` |
| Files | `extract_file_content` |
| Dashboards | `create_dashboard`, `create_dashboard_chart`, `list_user_dashboards` |

Full specification for each tool is in the
[Tool Reference](https://docs.thinknxg.com/thinknxgassistantcore/api/tool-reference).

---

## Schema access is live

TAC reads your schema from thinkNXG's metadata API at the moment a tool is
called. It keeps no schema copy of its own — no snapshot table, no
embedded or vector index of your data model, and no sync command. There
is nothing to re-run and no staleness window to reason about.

In practice that means:

- **Custom DocTypes, Custom Fields, and Property Setters are visible on
  the next tool call.** Create a field in the desk and the LLM sees it
  immediately. `get_doctype_info` returns custom fields merged inline
  with standard fields, along with child-table field definitions, Link
  targets, and the DocType's permission rules.
- **Renames, added options, and changed labels take effect the same
  way** — they come from the same live metadata read.
- **Permissions are evaluated per call against the requesting user**,
  never snapshotted. TAC asks thinkNXG on each call, so a role change
  applies as soon as thinkNXG applies it.

TAC does cache a few operational things — whether the server is
enabled, the MCP and OAuth endpoint URLs, and dashboard/health
statistics. None of them describe your schema or your data.

If you reach TAC through another product that embeds or orchestrates it,
that layer may maintain its own schema cache with its own refresh
behaviour. Staleness seen through a wrapper is worth tracing there
first; TAC itself has no such step.

---

## Extend with your own tools

If you have a thinkNXG app and want the LLM to reach into it, use the
`assistant_tools` hook in your app's `hooks.py`. This is the recommended
path — tools travel with the app, survive upgrades, and stay scoped to
your data model. The same pattern works for Skills via the
`assistant_skills` hook.

If you need to modify core TAC behaviour instead, write an internal
plugin.

See the [External App Development guide](docs/development/EXTERNAL_APP_DEVELOPMENT.md)
for the hook contract, and the
[Plugin Development guide](docs/development/PLUGIN_DEVELOPMENT.md) for
internal plugins.

---

## Authentication & security

TAC uses OAuth 2.0 with PKCE for LLM connections — the LLM never sees
the user's thinkNXG password. Every tool call is scoped to the calling
user's thinkNXG and thinkNXG ERP roles and permissions: if the user cannot
read a DocType in the desk, they cannot read it through the LLM either.
Every call is logged to `Assistant Audit Log` with caller, tool,
arguments, and result status, so admins always have a full record of
what the LLM did.

For setup and advanced configuration:

- [OAuth Setup Guide](https://docs.thinknxg.com/thinknxgassistantcore/getting-started/oauth/setup-guide)
- [Code Execution Security](https://docs.thinknxg.com/thinknxgassistantcore/guides/code-execution-security)
- [MCP StreamableHTTP Guide](https://docs.thinknxg.com/thinknxgassistantcore/internals/mcp-streamable-http)

---

## Documentation

**📚 Full docs are at [docs.thinknxg.com/thinknxgassistantcore](https://docs.thinknxg.com/thinknxgassistantcore)**

Common entry points:

- [Installation](https://docs.thinknxg.com/thinknxgassistantcore/getting-started/installation) — thinkNXG Cloud one-click + self-hosted bench
- [Quick Start](https://docs.thinknxg.com/thinknxgassistantcore/getting-started/quick-start) — connect Claude Desktop in 5 minutes
- [OAuth Setup Guide](https://docs.thinknxg.com/thinknxgassistantcore/getting-started/oauth/setup-guide) — production OAuth configuration
- [Tool Reference](https://docs.thinknxg.com/thinknxgassistantcore/api/tool-reference) — every built-in tool
- [fac-suite.com](https://fac-suite.com) — TAC Chat and FAC Cloud: what they do, plans, and sign-up
- [API Reference](https://docs.thinknxg.com/thinknxgassistantcore/api/reference) — MCP and OAuth protocol surface
- [Architecture](https://docs.thinknxg.com/thinknxgassistantcore/internals/architecture) — how TAC is put together
- [Changelog](https://docs.thinknxg.com/thinknxgassistantcore/reference/changelog) — release notes

For contributors editing this repo, see [`docs/development/`](docs/development/) and [Contributing.md](Contributing.md).

---

## Sponsor and professional services

thinkNXG Assistant Core is built and maintained in the open. If it saves
your team time, please consider sponsoring ongoing maintenance and new
features on [GitHub Sponsors](https://github.com/sponsors/buildswithpaul)
— recurring or one-time contributions.

Professional implementation, customization, training, and enterprise
support are delivered by our official services partner
[Promantia](https://promantia.com). Reach them at
[ai-support@promantia.com](mailto:ai-support@promantia.com), or register
your project at
<https://erp.promantia.in/fac-registration/new>. Full details in
[COMMERCIAL.md](COMMERCIAL.md).

The software itself remains completely free and open source under
AGPL-3.0. Professional services are optional.

---

## License

AGPL-3.0 — see [LICENSE](LICENSE).

For dual-licensing, new partnerships, or sponsorship inquiries, contact
<jypaulclinton@gmail.com>.

## Contributing

Contributions welcome. See [Contributing.md](Contributing.md) for the
pull-request workflow and coding standards.
