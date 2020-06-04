/* DeltaV Diagnostics Application Constants */

/**
 * API PREFIXES
 */
export const BASE_WS_URL: string = `${process.env.DELTA_DIAGNOSTICS_API_WS_URL}`;
export const BASE_URL: string = `${process.env.DELTA_DIAGNOSTICS_API_URL}`;
export const API_PREFIX: string = `${process.env.DELTA_DIAGNOSTICS_API_URL}/api`;
export const API_ACCOUNT_PREFIX: string = `${API_PREFIX}/Account`;
export const API_GRAPHICS_PREFIX: string = `${API_PREFIX}/Graphics`;
export const API_PROCESS_PREFIX: string = `${API_PREFIX}/Process`;
export const API_LICENSE_PREFIX: string = `${API_PREFIX}/License`;

/**
 * NAVIGATION/LINKS
 */
export const AUTHENTICATOR_PAGE_LINK: string = "/";
export const DASHBOARD_PAGE_LINK: string = "/Dashboard";
export const DASHBOARD_PAGE_NAME: string = "Dashboard";
export const API_TESTER_PAGE_LINK: string = "/ApiTester";
export const API_TESTER_PAGE_NAME: string = "API Tester";
export const ABOUT_PAGE_LINK: string = "/About";
export const ABOUT_PAGE_NAME: string = "About";
export const NAVIGATOR_SEPARATOR: string = " | ";
export const PARAMETER_TESTER_PAGE_LINK: string = "/ParameterTester";
export const PARAMETER_TESTER_PAGE_NAME: string = "Parameter Tester";
export const PERFORMANCE_TESTER_PAGE_LINK: string = "/PerformanceTester";
export const PERFORMANCE_TESTER_PAGE_NAME: string = "Performance Tester";
export const PERFORMANCE_RESULTS_PAGE_LINK: string = "/PerformanceResults";
export const PERFORMANCE_RESULTS_PAGE_NAME: string = "Performance Results";
export const DISPLAY_DETAILS_PAGE_LINK: string =
  "/DisplayDetails/:displayName/";
export const REFERENCE_DATA_PAGE_LINK: string =
  "/ReferenceData/:displayName/:instanceId";

/**
 * TITLES
 */
export const APP_TITLE: string = "DeltaV Live Diagnostics";
export const CONTROL_TAG_DISPLAY_SEARCH_TITLE: string =
  "Control Tag Displays Search";
export const DISPLAY_CONTROL_TITLE: string = "Display Control";
export const DISPLAY_DETAILS_SEARCH_TITLE: string = "Display Details Search";
export const DISPLAY_NAVIGATOR_TITLE: string = "Display Navigator";
export const INSTANCE_ID_DROPDOWN_TITLE: string = "Op Hub IDs";
export const SESSION_ID_FORM_PLACEHOLDER: string = "Enter sessionID";
export const SESSION_INFO_SESSION_ID_TITLE: string = "Session ID: ";
export const SESSION_INFO_INSTANCE_ID_TITLE: string = "Instance ID: ";
export const JSON_VIEWER_TITLE: string = "Display Details";

/**
 * MESSAGES
 */
export const NO_IDS_ERROR_MESSAGE: string =
  "No instanceIDs. Please make sure DeltaVLive is running.";

export const NO_ACTIVE_DISPLAY_HIERARCHY_MESSAGE: string =
  "No active display hierarchy.";

export const CONTROL_TAG_MESSAGE: string =
  "Associated control tag displays will be listed here.";

export const DISPLAY_NAVIGATOR_MESSAGE: string =
  "Select an instanceID for displays to appear.";

export const NO_PRE_RENDER_MESSAGE: string =
  "<p> No pre-render to display </p>";

export const API_CALL_ERROR_MESSAGE = (arg1: string) =>
  `${arg1}. Please double check input parameters.`;

/**
 * UI Strings/Misc
 */
export const NOT_FOUND_PAGE_CONTENT: string = "404, Page Not Found!";
export const ABOUT_PAGE_CONTENT: string =
  "Created by Kai Fleischman and Joshua Leikam, 2019";
export const DISPLAY_TYPE_PRIMARY: string = "Primary";
export const DISPLAY_TYPE_FACEPLATE: string = "Faceplate";
export const DISPLAY_TYPE_DETAIL: string = "Detail";

export const EVENT_KEY_DISPLAY_NAVIGATOR: string = "Navigate";
export const EVENT_KEY_DISPLAY_SEARCH: string = "Search";
export const EVENT_KEY_DISPLAY_HIERARCHY: string = "Display Tree";
export const EVENT_KEY_DISPLAY_DETAILS_VIEW: string = "Details";
export const EVENT_KEY_REFERENCE_DATA: string = "Reference Data";
export const EVENT_KEY_PRERENDER_DISPLAY: string = "Prerender Display";
export const EVENT_KEY_ACCOUNT_API_CARDS: string = "Account";
export const EVENT_KEY_GRAPHICS_API_CARDS: string = "Graphics";
export const EVENT_KEY_PROCESS_API_CARDS: string = "Process";
export const EVENT_KEY_LICENSE_API_CARDS: string = "License";
export const EVENT_KEY_API_TESTER_DETAILS_VIEW: string = "Details";
export const EVENT_KEY_PARAMETER_SUBSCRIBER: string = "Subscriber";
export const EVENT_KEY_PARAMETER_WRITER: string = "Writer";
export const EVENT_KEY_SUBSCRIPTIONS_VIEWER: string = "Subscriptions";
export const EVENT_KEY_WRITES_VIEWER: string = "Writes";
export const LIST_ADD_PARAMETER_BUTTON_TEXT: string = "Add";
export const LIST_REMOVE_ALL_PARAMETERS_BUTTON_TEXT: string = "Remove All";
export const LIST_SUBSCRIBE_TO_PARAMETERS_BUTTON_TEXT: string = "Subscribe";
export const LIST_WRITE_TO_PARAMETERS_BUTTON_TEXT: string = "Write";

export const LIST_MANAGER_REMOVE_BUTTON_TEXT: string = "Remove";
export const LIST_MANAGER_MANAGE_BUTTON_TEXT: string = "Manage";
export const LIST_MANAGER_ADD_BUTTON_TEXT: string = "Add";
export const LIST_MANAGER_REMOVE_SELECTED_BUTTON_TEXT: string =
  "Remove Selected";
export const LIST_MANAGER_REMOVE_ALL_BUTTON_TEXT: string = "Remove All";
export const LIST_MANAGER_TOGGLE_REMOVE_BUTTON_TEXT: string = "Toggle Remove";
export const LIST_MANAGER_TOGGLE_CHECKBOXES_BUTTON_TEXT: string =
  "Toggle Checkboxes";
export const LIST_MANAGER_SELECT_ALL_BUTTON_TEXT: string = "Select All";
export const LIST_MANAGER_DESELECT_ALL_BUTTON_TEXT: string = "Deselect All";

/**
 * OeWeb API ENDPOINT HELPER FUNCTIONS
 */

/**
 * Endpoint string for authenticating/changing sessions
 * @param instanceId DeltaV Live instance Id
 * @param sessionId user specified session Id
 */
export const API_CHANGE_SERVER_SESSION_ENDPOINT = (
  instanceId: string,
  sessionId: string
) =>
  `${API_ACCOUNT_PREFIX}/ChangeServerSession/CP3/ABCD/${sessionId}/${instanceId}`;

/**
 * Endpoint string for contextual displays
 * @param displayType e.g. faceplate, primary, detail
 * @param controlTagName name of controlTag
 */
export const API_GET_CONTEXTUAL_DISPLAY_ENDPOINT = (
  displayType: string,
  controlTagName: string
) => `${API_GRAPHICS_PREFIX}/${displayType}Display/${controlTagName}`;

export const API_GET_CONTROL_TAG_PRIMARY_DISPLAY_ENDPOINT_SHORT: string =
  "api/Graphics/PrimaryDisplay/";
export const API_GET_CONTROL_TAG_PRIMARY_DISPLAY_DESCRIPTION: string =
  "Get the primary control display for a Control Tag";

export const API_GET_CONTROL_TAG_FACEPLATE_DISPLAY_ENDPOINT_SHORT: string =
  "api/Graphics/FaceplateDisplay/";
export const API_GET_CONTROL_TAG_FACEPLATE_DISPLAY_DESCRIPTION: string =
  "Get the faceplate Display for a Control Tag";

export const API_GET_CONTROL_TAG_DETAIL_DISPLAY_ENDPOINT_SHORT: string =
  "api/Graphics/DetailDisplay/";
export const API_GET_CONTROL_TAG_DETAIL_DISPLAY_DESCRIPTION: string =
  "Get the detail display for a Control Tag";

/**
 * Endpoint string for all displays
 */
export const API_GET_ALL_DISPLAYS_ENDPOINT: string = `${API_GRAPHICS_PREFIX}/AllDisplays`;
export const API_GET_ALL_DISPLAYS_ENDPOINT_SHORT: string =
  "api/Graphics/AllDisplays";
export const API_GET_ALL_DISPLAYS_DESCRIPTION: string =
  "Get the list headers for all available displays";

/**
 * Endpoint string to get details for a given display
 * @param displayNameOrId
 */
export const API_GET_DISPLAY_DETAILS_ENDPOINT = displayNameOrId =>
  `${API_GRAPHICS_PREFIX}/Display/${displayNameOrId}`;
export const API_GET_DISPLAY_ENDPOINT_SHORT: string = "api/Graphics/Display/";
export const API_GET_DISPLAY_DESCRIPTION: string =
  "Get a list of IDs for all the Op Hub instances on this machine";

/**
 * Endpoint string to get all deltaV (operationsHub/opHub) instanceIds
 */
export const API_GET_ALL_IDS_ENDPOINT: string = `${API_ACCOUNT_PREFIX}/AllOpHubInstanceIDs`;
export const API_GET_ALL_IDS_ENDPOINT_SHORT: string =
  "api/Account/AllOpHubInstanceIDs";
export const API_GET_ALL_IDS_DESCRIPTION: string =
  "Get a list of IDs for all the Op Hub instances on this machine";

export const CONTROL_TAG_INPUT_PLACEHOLDER: string = "Control Tag Name";
export const DISPLAY_NAME_INPUT_PLACEHOLDER: string = "Display Name or Id";
export const STANDARD_NAME_INPUT_PLACEHOLDER: string = "Standard Name";
export const CTX_STRING_INPUT_PLACEHOLDER: string = "ctx string (optional)";
/**
 * Endpoint string to get reference data for a display
 * @param nameOrId
 * @param instanceId
 */
export const API_GET_DISPLAY_REFERENCES_ENDPOINT = (nameOrId, instanceId) =>
  `${API_GRAPHICS_PREFIX}/References/${nameOrId}/${instanceId}`;
export const API_GET_REFERENCE_ENDPOINT_SHORT: string =
  "api/Graphics/References/";
export const API_GET_REFERENCE_DESCRIPTION: string =
  "Get the references for a display";

/**
 * Endpoint string to get the value of a standard
 * @param standardName
 * @param instanceId
 */
export const API_GET_STANDARD_VALUE_ENDPOINT = (standardName, instanceId) =>
  `${API_GRAPHICS_PREFIX}/Standard/${standardName}/${instanceId}`;
export const API_GET_STANDARD_VALUE_ENDPOINT_SHORT: string =
  "api/Graphics/Standard/";
export const API_GET_STANDARD_VALUE_DESCRIPTION: string =
  "Get the standard value with the given name";

/**
 * Endpoint string to get the active display hierarchy
 * @param instanceId
 */
export const API_GET_ACTIVE_DISPLAY_HIERARCHY_ENDPOINT = instanceId =>
  `${API_GRAPHICS_PREFIX}/getActiveDisplayHierarchy/${instanceId}`;
export const API_GET_ACTIVE_DISPLAY_HIERARCHY_ENDPOINT_SHORT: string =
  "api/Graphics/getActiveDisplayHierarchy";
export const API_GET_ACTIVE_DISPLAY_HIERARCHY_DESCRIPTION: string =
  "Get the active display hierarchy for the specified instance";

/**
 * Endpoint string to get the pre render display
 * @param displayNameOrId
 */
export const API_GET_PRERENDER_DISPLAY_ENDPOINT = displayNameOrId =>
  `${API_GRAPHICS_PREFIX}/PrerenderDisplay/${displayNameOrId}`;
export const API_GET_PRERENDER_DISPLAY_ENDPOINT_SHORT: string =
  "api/Graphics/PrerenderDisplay/";
export const API_GET_PRERENDER_DISPLAY_DESCRIPTION: string =
  "Get the pre-rendered display";

/**
 * Endpoint string to get the pre render display parameters
 * @param displayNameOrId
 * @param ctxString
 */
export const API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT = (
  displayNameOrId,
  ctxString
) => {
  if (ctxString !== null) {
    return `${API_GRAPHICS_PREFIX}/PrerenderDisplayParameters/${displayNameOrId}/${ctxString}`;
  }
  return `${API_GRAPHICS_PREFIX}/PrerenderDisplayParameters/${displayNameOrId}`;
};

export const API_GET_PRERENDER_DISPLAY_PARAMETERS_ENDPOINT_SHORT: string =
  "api/Graphics/PrerenderDisplayParameters/";
export const API_GET_PRERENDER_DISPLAY_PARAMETERS_DESCRIPTION: string =
  "Get the pre-rendered parameter list for the display";

/**
 * Endpoint string to view basic information about a module
 * @param modeuleNameOrId
 */
export const API_GET_MODULE_INFO_ENDPOINT = moduleNameOrId => {
  let moduleReferenceJson = `{"name": "${moduleNameOrId}" }`;
  return `${API_PROCESS_PREFIX}/GetModuleInfo/${moduleReferenceJson}`;
};

export const API_GET_MODULE_INFO_PREFIX: string = "api/Process/GetModuleInfo/";
export const API_GET_MODULE_INFO_DESCRIPTION: string =
  "Get the module information";

/**
 * Endpoint string to view license info for the workstation
 */
export const API_GET_APPLICATION_LICENSE_INFO: string = `${API_LICENSE_PREFIX}/GetApplicationLicenseInfo`;
export const API_GET_APPLICATION_LICENSE_INFO_PREFIX: string =
  "api/License/GetApplicationLicenseInfo";
export const API_GET_APPLICATION_LICENSE_INFO_DESCRIPTION: string =
  "Get the license information";

/**
 * Header for fetch requests to oeweb server
 */
export const API_GET_INCLUDE_HEADER: object = {
  method: "GET",
  credentials: "include"
};

/**
 * Gets the active display name hierarchy endpoint
 * @param instanceId DeltaVLive instanceId
 */
export const API_GET_ACTIVE_DISPLAYNAME_HIERARCHY_ENDPOINT = (
  instanceId: string
) => `${API_GRAPHICS_PREFIX}/GetActiveDisplayNameHierarchy/${instanceId}`;

export const API_GET_PERFORMANCE_TESTS_ENDPOINT: string = `${BASE_URL}/performance/test/all/`;

export const API_GET_PERFORMANCE_DATA_ENDPOINT = (
  performanceTestId: string,
  days: string
) =>
  `${BASE_URL}/performance/test/result/?testId=${performanceTestId}&days=${days}`;

export const API_GET_PERFORMANCE_BOXPLOT_ENDPOINT = (
  performanceTestId: string,
  days: string
) =>
  `${BASE_URL}/performance/test/result/boxplot/?testId=${performanceTestId}&days=${days}`;

export const API_INIT_PERFORMANCE_TEST_ENDPOINT: string = `${BASE_URL}/performance/test/init`;
export const API_CANCEL_PERFORMANCE_TEST_ENDPOINT = (
  performanceTestId: string
) => `${BASE_URL}/performance/test/cancel?${performanceTestId}`;

export const API_AUTH_TOKEN_ENDPOINT: string = `${BASE_URL}/auth/token`;
export const API_AUTH_LOGIN_ENDPOINT: string = `${BASE_URL}/auth/login`;

export const API_ONE_TIME_TOKEN_ENDPOINT: string = `${BASE_URL}/api/Account/OneTimeToken/`;
export const WS_URL = () => {
  let url = new URL(BASE_URL);
  return `ws://${url.host}/api/ws`;
};
