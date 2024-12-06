export interface Conversation {
  title: string;
  create_time: number;
  update_time: number;
  mapping: Mapping[];
  moderation_results: [];
  current_node: string;
  plugin_ids: PluginID[] | null;
  conversation_id: string;
  conversation_template_id: null | string;
  gizmo_id: null | string;
  gizmo_type: null;
  is_archived: boolean;
  is_starred: null;
  safe_urls: string[];
  default_model_slug: Slug | null;
  conversation_origin: null;
  voice: "cove" | null;
  async_status: number | null;
  disabled_tool_ids: [];
  id: string;
}

export type Slug = "o1-preview" | "gpt-4o" | "gpt-4" | "gpt-4-gizmo" | "auto" | "gpt-4o-canmore" | "text-davinci-002-render-sha" | "o1-mini" | "gpt-4o-mini" | "gpt-4-plugins" | "gpt-4-dalle" | "gpt-4-code-interpreter";

export interface Mapping {
  id: string;
  message: MappingMessage | null;
  parent: null | string;
  children: string[];
}

export interface MappingMessage {
  id: string;
  author: Author;
  create_time: number | null;
  update_time: number | null;
  content: MessageContent;
  status: MessageStatus;
  end_turn: boolean | null;
  weight: number;
  metadata: MessageMetadata;
  recipient: Recipient;
  channel: null;
}

export interface Author {
  role: Role;
  name: null | string;
  metadata: AuthorMetadata;
}

export interface AuthorMetadata {
  real_author?: "tool:web";
}

export type Role = "system" | "user" | "tool" | "assistant";

export interface MessageContent {
  content_type: ContentContentType;
  parts?: Array<PartClass | string>;
  language?: Language;
  response_format_name?: null;
  text?: string;
  user_profile?: string;
  user_instructions?: string;
  result?: string;
  summary?: null | string;
  assets?: [] | null;
  tether_id?: null;
  name?: ContentName;
  url?: string;
  domain?: string;
  title?: string;
}

export type ContentContentType = "text" | "code" | "user_editable_context" | "multimodal_text" | "tether_browsing_display" | "system_error" | "tether_quote" | "execution_output";

export type Language = "json" | "unknown";

export type ContentName = "tool_error" | "AceInternalException" | "Exception" | "ChatGPTAgentToolException" | "UnrecognizedFunctionError";

export interface PartClass {
  content_type: AudioAssetPointerContentType;
  asset_pointer?: string;
  size_bytes?: number;
  width?: number;
  height?: number;
  fovea?: number | null;
  metadata?: PartMetadata | null;
  frames_asset_pointers?: [];
  video_container_asset_pointer?: null;
  audio_asset_pointer?: AudioAssetPointer;
  audio_start_timestamp?: number;
  text?: string;
  direction?: Direction;
  decoding_id?: null;
  format?: "wav";
}

export interface AudioAssetPointer {
  content_type: AudioAssetPointerContentType;
  asset_pointer: string;
  size_bytes: number;
  format: "wav";
  metadata: AudioAssetPointerMetadata;
}

export type AudioAssetPointerContentType = "audio_asset_pointer" | "image_asset_pointer" | "real_time_user_audio_video_asset_pointer" | "audio_transcription";

export interface AudioAssetPointerMetadata {
  start_timestamp: null;
  end_timestamp: null;
  pretokenized_vq: null;
  interruptions: null;
  original_audio_source: null;
  transcription: null;
  start: number;
  end: number;
}

export type Direction = "in" | "out";

export interface PartMetadata {
  dalle?: Dalle | null;
  gizmo?: null;
  emu_omit_glimpse_image?: null;
  emu_patches_override?: null;
  sanitized?: boolean;
  start_timestamp?: null;
  end_timestamp?: null;
  pretokenized_vq?: null;
  interruptions?: null;
  original_audio_source?: null;
  transcription?: null;
  start?: number;
  end?: number;
}

export interface Dalle {
  gen_id: null | string;
  prompt: string;
  seed: number;
  parent_gen_id: null;
  edit_op: null;
  serialization_title: "DALL-E generation metadata";
}

export interface MessageMetadata {
  is_visually_hidden_from_conversation?: boolean;
  is_user_system_message?: boolean;
  user_context_message_data?: UserContextMessageData | null;
  serialization_metadata?: SerializationMetadata;
  request_id?: null | string;
  message_source?: "instant-query" | null;
  timestamp_?: "absolute";
  message_type?: null;
  finished_text?: string;
  initial_text?: "Thinking";
  parent_id?: string;
  snorkle_status?: number;
  citations?: Citation[];
  content_references?: ContentReference[];
  gizmo_id?: null | string;
  finish_details?: FinishDetails;
  is_complete?: boolean;
  model_slug?: Slug;
  default_model_slug?: Slug;
  pad?: Pad;
  attachments?: Attachment[];
  search_result_groups?: SearchResultGroup[];
  image_results?: Image[];
  real_time_audio_has_video?: boolean;
  invoked_plugin?: InvokedPlugin;
  jit_plugin_data?: JITPluginData;
  rebase_system_message?: boolean;
  sonic_classification_result?: SonicClassificationResult;
  voice_mode_message?: boolean;
  kwargs?: Kwargs;
  command?: Command;
  status?: MetadataStatus;
  search_source?: SearchSource;
  client_reported_search_source?: ClientReportedSearchSource | null;
  message_locale?: "en-US";
  system_hints?: Command[];
  _cite_metadata?: CiteMetadata;
  args?: Array<Array<number | string> | number | string>;
  paragen_variants_info?: ParagenVariantsInfo;
  paragen_variant_choice?: string;
  aggregate_result?: AggregateResult;
  ada_visualizations?: AdaVisualization[];
  augmented_paragen_prompt_label?: null;
  shared_conversation_id?: string;
  canvas?: Canvas;
  exclusive_key?: string;
  model_switcher_deny?: ModelSwitcherDeny[];
  filter_out_for_training?: boolean;
  model_adjustments?: "auto:smaller_model:reached_message_cap"[];
}

export interface CiteMetadata {
  citation_format: CitationFormat;
  metadata_list: MetadataListElement[];
  original_query: null;
}

export interface CitationFormat {
  name: "tether_og";
  regex?: "【(\\d+)(?::(\\d+))?†([^†【】]*)[^【】]*?】";
}

export interface MetadataListElement {
  type: MetadataListType;
  title?: string;
  url?: string;
  text: string;
  pub_date?: Date | null;
  extra?: Extra | null;
  name?: string;
  id?: ID;
  source?: "my_files";
  og_tags?: null;
}

export interface Extra {
  cited_message_idx: number;
  evidence_text: "source";
  search_result_idx?: number | null;
  cloud_doc_url?: null;
}

export type ID = "file-hchX2vNu7NoiAy76CZCvqiQN" | "file-DyR42ouUNHQV6SRHnFottEQI" | "file-eq7m6EZvPMI5W3Q7r7rm3ynM" | "" | "file-GnPvZcY2olPUiZsuk4shgSGJ" | "file-7SK0KUOmePkwcoVooNgRrgq4" | "file-Ip6VoilcNoQ3IQe2nWHghPXA" | "file-q28hVYiKrHGEeAO3o5gTW3BV" | "file-mYMzL1q4DOB59fDP760dXjrW" | "file-02O7cEATICInEbGyilzmQXjK" | "file-pvzB8ziioaViUwl92lqNqzhc" | "file-gSrBTSdFHh5y7wxDmJTR2Jhx" | "file-ZP2uoMPbS5nzZI1jvbTbXXb3" | "file-hY8Z6aR4csKJxcK0piFmF5ZX";

export type MetadataListType = "webpage" | "file" | "hidden" | "sources_footnote" | "webpage_extended" | "image_v2" | "tldr" | "navigation" | "grouped_webpages" | "nav_list" | "video" | "stock" | "attribution_footer";

export interface AdaVisualization {
  type: AdaVisualizationType;
  file_id: string;
  title: string;
  chart_type?: ChartType;
  fallback_to_image?: boolean;
}

export type ChartType = "line" | "" | "bar";

export type AdaVisualizationType = "chart" | "table";

export interface AggregateResult {
  status: AggregateResultStatus;
  run_id: string;
  start_time: number;
  update_time: number;
  code: string;
  end_time: number | null;
  final_expression_output: null | string;
  in_kernel_exception: InKernelException | null;
  system_exception: null;
  messages: MessageElement[];
  jupyter_messages: JupyterMessage[];
  timeout_triggered: number | null;
}

export interface InKernelException {
  name: string;
  traceback: string[];
  args: string[];
  notes: [];
}

export interface JupyterMessage {
  msg_type: MsgType;
  parent_header?: ParentHeader;
  content?: JupyterMessageContent;
  timeout?: number;
}

export interface JupyterMessageContent {
  execution_state?: ExecutionState;
  traceback?: string[];
  ename?: string;
  evalue?: string;
  data?: ContentData;
  name?: string;
  text?: string;
}

export interface ContentData {
  "text/plain": string;
  "image/vnd.openai.fileservice2.png"?: string;
  "image/vnd.openai.fileservice.png"?: string;
  "text/html"?: string;
}

export type ExecutionState = "busy" | "idle";

export type MsgType = "status" | "execute_input" | "error" | "execute_result" | "display_data" | "stream" | "@timeout";

export interface ParentHeader {
  msg_id: string;
  version: string;
}

export interface MessageElement {
  message_type: MessageType;
  time: number;
  sender: Sender;
  image_payload?: null;
  image_url?: string;
  width?: number;
  height?: number;
  stream_name?: string;
  text?: string;
  timeout_triggered?: number;
}

export type MessageType = "image" | "stream" | "timeout_interrupt";

export type Sender = "server" | "client";

export type AggregateResultStatus = "failed_with_in_kernel_exception" | "success" | "running";

export interface Attachment {
  id: string;
  size?: number;
  name: string;
  mime_type?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  fileTokenSize?: number;
  file_token_size?: number;
  fileSizeTokens?: null;
}

export interface Canvas {
  textdoc_id: string;
  textdoc_type: string;
  version: number;
  title?: string;
  from_version?: number;
  textdoc_content_length?: number;
  user_message_type?: string;
  accelerator_metadata?: AcceleratorMetadata;
  comment_ids?: string[];
}

export interface AcceleratorMetadata {
  action: string;
  id: string;
  prompt: string;
}

export interface Citation {
  start_ix: number;
  end_ix: number;
  invalid_reason?: string;
  metadata?: MetadataListElement;
  citation_format_type?: "tether_og";
}

export type ClientReportedSearchSource = "composer_auto" | "url_search_hint" | "conversation_composer_web_icon" | "conversation_composer_previous_web_mode" | "composer_search" | "homepage_composer_web_icon";

export type Command = "search" | "click" | "quote_lines" | "open_url" | "scroll" | "mclick" | "create_textdoc" | "update_textdoc" | "comment_textdoc" | "spinner" | "context_stuff" | "prompt" | "back" | "msearch";

export interface ContentReference {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  alt: null | string;
  prompt_text?: null | string;
  type: MetadataListType;
  invalid?: boolean;
  title?: string;
  url?: string;
  pub_date?: number | null;
  snippet?: null | string;
  attributions?: null;
  attributions_debug?: null;
  attribution?: string;
  sources?: SourceElement[];
  has_images?: boolean;
  images?: Image[];
  display_title?: string;
  page_title?: string;
  leaf_description?: string;
  breadcrumbs?: string[];
  name?: string;
  id?: ID;
  source?: "my_files";
  cloud_doc_url?: null;
  safe_urls?: string[];
  entries?: ContentReferenceEntry[];
  items?: Item[];
  status?: string;
  error?: null;
  navigation_fallback?: null;
  thumbnail_url?: string;
  video_site?: string;
  video_id?: string;
  ticker?: string;
  asset_type?: string;
  stock?: Stock;
}

export interface ContentReferenceEntry {
  domain: string;
  entries: EntryEntry[];
  attribution: string;
}

export interface EntryEntry {
  url: string;
  title: string;
}

export interface Image {
  url: string;
  content_url: string;
  thumbnail_url: string;
  title: string;
  content_size: Size;
  thumbnail_size: Size;
}

export interface Size {
  width: number;
  height: number;
}

export interface Item {
  title: string;
  url: string;
  pub_date: number | null;
  snippet?: string;
  attributions?: null;
  attributions_debug?: null;
  attribution: string;
  thumbnail_url?: null | string;
  attribution_segments?: null;
}

export interface SourceElement {
  title: string;
  url: string;
  attribution: string;
}

export interface Stock {
  asset: Asset;
  price: Price;
  histories: Histories;
}

export interface Asset {
  name: string;
  ticker: string;
  market: string;
  asset_type: string;
  latest_trading_period: LatestTradingPeriod;
  timezone: string;
}

export interface LatestTradingPeriod {
  regular: AfterHours;
  pre_market: AfterHours;
  after_hours: AfterHours;
}

export interface AfterHours {
  start_timestamp: number;
  start_utc_offset_sec: number;
  end_timestamp: number;
  end_utc_offset_sec: number;
}

export interface Histories {
  quotes: Quotes;
}

export interface Quotes {
  "1d": The1_D[];
  "5d": The1_D[];
  "1m": The1_D[];
  "6m": The1_D[];
  ytd: The1_D[];
  "1y": The1_D[];
  "5y": The1_D[];
}

export interface The1_D {
  timestamp: number;
  close: number;
  currency_code: "USD";
}

export interface Price {
  price: number;
  currency_code: "USD";
  change_percent: number;
  change: number;
  intraday_high: null;
  intraday_low: null;
  latest_trade_timestamp: number;
}

export interface FinishDetails {
  type: FinishDetailsType;
  stop_tokens?: number[];
  stop?: Stop;
}

export type Stop = "<|diff_marker|>" | "<|fim_suffix|>" | "<|im_end|>";

export type FinishDetailsType = "stop" | "unknown" | "interrupted" | "max_tokens";

export interface InvokedPlugin {
  type: "remote";
  namespace: string;
  plugin_id: string;
  http_response_status: number;
}

export interface JITPluginData {
  from_server?: FromServer;
  from_client?: FromClient;
}

export interface FromClient {
  type?: FromClientType;
  target_message_id?: string;
  user_action?: UserAction;
}

export type FromClientType = "allow" | "deny" | "always_allow" | "oauth_redirect";

export interface UserAction {
  data: UserActionData;
  target_message_id: string;
}

export interface UserActionData {
  type: FromClientType;
  operation_hash?: string;
}

export interface FromServer {
  type: FromServerType;
  body: Body;
}

export interface Body {
  domain: string;
  is_consequential?: boolean;
  privacy_policy: string;
  method?: Method;
  path: string;
  operation?: string;
  params: Params;
  actions: Action[];
}

export interface Action {
  name?: string;
  type: FromClientType;
  allow?: Allow;
  deny?: Allow;
  always_allow?: AlwaysAllow;
  oauth_redirect?: OauthRedirect;
}

export interface Allow {
  target_message_id: string;
}

export interface AlwaysAllow {
  target_message_id: string;
  operation_hash: string;
}

export interface OauthRedirect {
  gizmo_id: string;
  gizmo_action_id: string;
  domain: string;
  target_message_id: string;
}

export type Method = "get" | "post";

export interface Params {
  apps?: string;
  available_action_id?: string;
  instructions?: string;
  params_hints?: ParamsHints;
  diagramTypesToExplore?: string[];
  site?: string;
  tagged?: string;
  sort?: string;
  intro_slide?: IntroSlide;
  prompt?: string;
  slides?: Slide[];
  publicationId?: string;
  order_by?: string;
  direction?: string;
  todate?: number;
}

export interface IntroSlide {
  title: string;
}

export interface ParamsHints {
  Calendar?: string;
}

export interface Slide {
  content: string;
  title: string;
}

export type FromServerType = "preview" | "confirm_action" | "oauth_required";

export interface Kwargs {
  message_id: string;
  pending_message_id?: null | string;
  sync_write?: boolean;
}

export interface ModelSwitcherDeny {
  slug: Slug;
  context: Context;
  reason: "unsupported_canvas";
  description: "This model doesn't support canvas.";
}

export type Context = "regenerate" | "conversation";

export type Pad = "AA" | "AAAAAAAAAAAAAAAAAAAAAAAAAAA" | "A" | "AAAA" | "AAA" | "AAAAAAAAAAA" | "AAAAAAAAAAAAAA" | "AAAAAAAA" | "AAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAA" | "AAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAA" | "AAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAA" | "AAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAA" | "AAAAAAAAAAAA" | "AAAAA" | "AAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAA" | "AAAAAAAAAAAAAAAAAAAAAAA";

export interface ParagenVariantsInfo {
  type: string;
  num_variants_in_stream: number;
  display_treatment: string;
  conversation_id: string;
}

export interface SearchResultGroup {
  type: "search_result_group";
  domain: string;
  entries: SearchResultGroupEntry[];
}

export interface SearchResultGroupEntry {
  type: "search_result";
  url: string;
  title: string;
  snippet: string;
  ref_id: RefID;
  content_type: null;
  pub_date: number | null;
  attributions?: null;
  attributions_debug?: null;
}

export interface RefID {
  turn_index: number;
  ref_type: Command;
  ref_index: number;
}

export type SearchSource = "composer_auto" | "composer_search" | "instant_query";

export interface SerializationMetadata {
  custom_symbol_offsets: [];
}

export interface SonicClassificationResult {
  latency_ms: number | null;
  search_prob: number | null;
}

export type MetadataStatus = "finished" | "failed" | "running";

export interface UserContextMessageData {
  about_model_message: string;
  about_user_message?: string;
}

export type MessageStatus = "finished_successfully" | "in_progress" | "finished_partial_completion";

export type PluginID = "plugin-33798a7a-5dd8-4023-ad42-fe61f9c0d3c0" | "plugin-44655cb9-a74a-4ae3-88a3-adec2c3fd282" | "plugin-c44800a0-5474-49e0-86ab-d2c621a17b3e" | "plugin-5a0f59f4-4a31-4f2b-b4c0-bb356824f084" | "plugin-5b0d9237-2e0a-4604-bc83-096fb0ccf43c";

/*

Recipient indicates which tool should handle the message.
Here is the count of recipients from my history.

  32279  all
    681  browser
    463  assistant
    321  web
    227  python
    205  dalle.text2im
    110  bio
     77  myfiles_browser
     61  BrowserOp.transcodeWebPage
     20  actions_zapier_com__jit_plugin.run_action
     12  actions_zapier_com__jit_plugin.list_available_actions
      7  AskTheCode.QueryGithubRepositoryFileContents
      1  AskTheCode.QueryGithubRepositoryStructure
      5  browserOp.transcodeWebPage
      2  browserop.transcodeWebPage
      6  cleanuri_com__jit_plugin.shortenALongUrl
      3  api_beehiiv_com__jit_plugin.GetPost
      1  api_beehiiv_com__jit_plugin.GetPosts
      2  api_stackexchange_com__jit_plugin.search
      3  askyourpdf.perform_query_query_post
      1  canmore.comment_textdoc
      3  canmore.create_textdoc
      1  canmore.update_textdoc
      1  catfact_ninja__jit_plugin.catfacts
      1  catfact_ninja__jit_plugin.getRandomFact
      2  chatgpt_plugin_canva_com__jit_plugin.generateDesigns
      1  dalle.image_generation
      1  deepgame_me__jit_plugin.createNewChat
      1  diagrams_helpful_dev__jit_plugin.get__MermaidRoute
      1  diagrams_helpful_dev__jit_plugin.get_DiagramGuidelinesRoute
      1  diagrams_helpful_dev__jit_plugin.get_ExploreDiagramsRoute
      1  gpt_slides_aidocmaker_com__jit_plugin.create_pptx_directly_with_content
      2  jit_plugin.shortenALongUrl
      1  researchgpt_typeset_io__jit_plugin.v1_paper_list
      2  smart_slides.getPresentationLink
      2  www_veed_io__jit_plugin.GenerateProject
*/
export type Recipient = string;
