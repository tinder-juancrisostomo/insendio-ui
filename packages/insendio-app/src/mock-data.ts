/**
 * Mock data for Insendio app - matches screenshots pixel-perfect
 */

export const environments = [
  { id: 'prod', label: 'Prod', color: 'green' },
  { id: 'd1', label: 'D1', color: 'orange' },
  { id: 'd2', label: 'D2', color: 'purple' },
] as const;

export const navItems = [
  { id: 'home', label: 'Home', path: '/', icon: 'house' },
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'chart-bar' },
  { id: 'notifications', label: 'Notifications', path: '/notifications', icon: 'bell' },
  { id: 'segments', label: 'Segments', path: '/segments', icon: 'users' },
  { id: 'monitoring', label: 'Monitoring', path: '/monitoring', icon: 'chart-line' },
  { id: 'data', label: 'Data', path: '/data', icon: 'database' },
] as const;

export const recentCampaigns = [
  { id: '1', name: 'User Like Notification', status: 'active', channel: 'Push', type: 'Marketing', lastModified: '2h ago' },
  { id: '2', name: 'QA_Test_Welcome_Email', status: 'draft', channel: 'Email', type: 'Transactional', lastModified: '1d ago' },
  { id: '3', name: 'Product Launch Modal', status: 'active', channel: 'Modal', type: 'Marketing', lastModified: '3d ago' },
  { id: '4', name: 'Cart Abandonment SMS', status: 'scheduled', channel: 'SMS', type: 'Marketing', lastModified: '5d ago' },
  { id: '5', name: 'QA_Testing_Push_Notification', status: 'draft', channel: 'Push', type: 'Testing', lastModified: '1d ago' },
  { id: '6', name: 'Weekly Newsletter', status: 'active', channel: 'Email', type: 'Marketing', lastModified: '2d ago' },
  { id: '7', name: 'Payment Confirmation', status: 'active', channel: 'Email', type: 'Transactional', lastModified: '1w ago' },
  { id: '8', name: 'QA_Tooltip_Test', status: 'draft', channel: 'Tooltip', type: 'Testing', lastModified: '2d ago' },
  { id: '9', name: 'Flash Sale Alert', status: 'paused', channel: 'Push', type: 'Marketing', lastModified: '3d ago' },
  { id: '10', name: 'Account Security Alert', status: 'active', channel: 'Email', type: 'Transactional', lastModified: '1w ago' },
] as const;

export const campaigns = [
  { id: '1', name: 'User Like Notification', status: 'active', channel: ['Push', 'Email'], type: 'Marketing', startDate: 'Jan 1, 2026', endDate: 'Ongoing' },
  { id: '2', name: 'QA_Test_Welcome_Email', status: 'draft', channel: ['Email'], type: 'Transactional', startDate: 'Not started', endDate: '' },
  { id: '3', name: 'Product Launch Modal', status: 'active', channel: ['Modal', 'Push'], type: 'Marketing', startDate: 'Jan 5, 2026', endDate: 'Jan 20, 2026' },
  { id: '4', name: 'Cart Abandonment SMS', status: 'scheduled', channel: ['SMS', 'Email'], type: 'Marketing', startDate: 'Jan 15, 2026', endDate: 'Ongoing' },
  { id: '5', name: 'QA_Testing_Push_Notification', status: 'draft', channel: ['Push'], type: 'Testing', startDate: 'Not started', endDate: '' },
  { id: '6', name: 'Weekly Newsletter', status: 'active', channel: ['Email', 'Push'], type: 'Marketing', startDate: 'Dec 1, 2025', endDate: 'Ongoing' },
  { id: '7', name: 'Payment Confirmation', status: 'active', channel: ['Email'], type: 'Transactional', startDate: 'Nov 1, 2025', endDate: 'Ongoing' },
  { id: '8', name: 'QA_Tooltip_Test', status: 'draft', channel: ['Tooltip'], type: 'Testing', startDate: 'Not started', endDate: '' },
  { id: '9', name: 'Flash Sale Alert', status: 'paused', channel: ['Push', 'SMS'], type: 'Marketing', startDate: 'Jan 3, 2026', endDate: 'Jan 3, 2026' },
  { id: '10', name: 'Account Security Alert', status: 'active', channel: ['Email', 'Push', 'SMS'], type: 'Transactional', startDate: 'Oct 1, 2025', endDate: 'Ongoing' },
] as const;

export const segments = [
  { id: '1', name: 'Active Users (30 days)', type: 'Behavioral', users: 45231, lastModified: '2h ago' },
  { id: '2', name: 'Premium Subscribers', type: 'Subscription', users: 12456, lastModified: '1d ago' },
  { id: '3', name: 'Cart Abandoners', type: 'Behavioral', users: 8923, lastModified: '3d ago' },
  { id: '4', name: 'New Users (7 days)', type: 'Temporal', users: 3421, lastModified: '5d ago' },
  { id: '5', name: 'High-Value Customers', type: 'Revenue', users: 1234, lastModified: '1w ago' },
] as const;

export const segmentStats = {
  totalSegments: 5,
  totalUsers: '71.2K',
  updatedToday: 3,
} as const;

export const monitoringMetrics = {
  totalSent: '1,825,432',
  delivered: '1,816,590',
  avgOpenRate: '39.2%',
  activeCampaigns: 3,
} as const;

export const campaignMetrics = [
  {
    id: '1',
    name: 'User Like Notification',
    status: 'active',
    channel: ['Push', 'Email'],
    sent: '125,432',
    delivered: '123,890',
    deliveryRate: '98.8%',
    opened: '85,234',
    openRate: '68.8%',
    clickRate: '49.4%',
    alert: { type: 'success', message: 'This campaign is performing exceptionally well! Open rate is 38% above industry average.' },
  },
  {
    id: '2',
    name: 'Product Launch Modal',
    status: 'active',
    channel: ['Modal', 'Push'],
    sent: '1,200,000',
    delivered: '1,195,200',
    deliveryRate: '99.6%',
    opened: '478,080',
    openRate: '40.0%',
    clickRate: '30.0%',
    alert: { type: 'info', message: 'Campaign is performing well with strong delivery rates. Click-through could be improved.' },
  },
  {
    id: '3',
    name: 'Weekly Newsletter',
    status: 'active',
    channel: ['Email'],
    sent: '500,000',
    delivered: '497,500',
    deliveryRate: '99.5%',
    opened: '149,250',
    openRate: '30.0%',
    clickRate: '20.0%',
    alert: null,
  },
] as const;

export const eventTriggers = [
  { id: '1', name: 'Profile Completed', internalName: 'profile_completed', status: 'active', description: 'Triggered when user completes their profile', triggers: 1247, lastTriggered: '2025-01-12 14:32', api: 'Production API', parameters: ['user_id*', 'completion_percentage*'] },
  { id: '2', name: 'Match Created', internalName: 'match_created', status: 'active', description: 'Triggered when two users match', triggers: 8923, lastTriggered: '2025-01-12 15:45', api: 'Production API', parameters: ['user_id*', 'match_user_id*', 'match_score'] },
  { id: '3', name: 'Purchase Completed', internalName: 'purchase_completed', status: 'active', description: 'Triggered when user completes a purchase', triggers: 342, lastTriggered: '2025-01-11 09:15', api: 'Development API', parameters: ['user_id*', 'amount*', 'currency*', 'product_id*'] },
  { id: '4', name: 'Subscription Upgraded', internalName: 'subscription_upgraded', status: 'inactive', description: 'Triggered when user upgrades their subscription', triggers: 0, lastTriggered: null, api: 'Production API', parameters: ['user_id*', 'old_tier*', 'new_tier*'] },
] as const;

export const dataTabs = [
  { id: 'event-triggers', label: 'Event Triggers', icon: 'lightning' },
  { id: 'user-attributes', label: 'User Attributes', icon: 'person' },
  { id: 'display-triggers', label: 'Display Triggers', icon: 'eye' },
  { id: 'anchor-points', label: 'Anchor Points', icon: 'map-pin' },
  { id: 'deeplinks', label: 'Deeplinks', icon: 'code' },
  { id: 'media', label: 'Media', icon: 'image' },
  { id: 'dynamic-variables', label: 'Dynamic Variables', icon: 'hash' },
] as const;

export const userAttributes = [
  { id: '1', name: 'Subscription Tier', status: 'active' as const, apiKey: 'subscription_tier', description: "User's current subscription level", type: 'string', default: 'free', userCount: 15234, lastUpdated: '2025-01-12 14:32', api: 'Production API' },
  { id: '2', name: 'Profile Completion', status: 'active' as const, apiKey: 'profile_completion', description: 'Percentage of profile completed', type: 'number', default: '8', userCount: 15234, lastUpdated: '2025-01-12 15:45', api: 'Production API' },
  { id: '3', name: 'Last Active Date', status: 'active' as const, apiKey: 'last_active_date', description: 'Last time user was active', type: 'date', default: '', userCount: 15234, lastUpdated: '2025-01-12 18:23', api: 'Production API' },
  { id: '4', name: 'Premium User', status: 'active' as const, apiKey: 'is_premium', description: 'Whether user has premium subscription', type: 'boolean', default: 'false', userCount: 3421, lastUpdated: '2025-01-11 10:19', api: 'Production API' },
  { id: '5', name: 'Marketing Opt-in', status: 'inactive' as const, apiKey: 'marketing_opt_in', description: 'User consent for marketing communications', type: 'boolean', default: 'false', userCount: 0, lastUpdated: '2025-01-10 09:00', api: 'Development API' },
] as const;

export const displayTriggers = [
  { id: '1', name: 'Welcome Modal Trigger', internalName: 'welcome_modal_trigger', type: 'Page Load' as const, status: 'active' as const, description: 'Show welcome content when homepage loads', triggers: 3621, lastTriggered: '2023-01-12 14:32', page: '/home', selector: null, channels: ['Modal', 'Banner'] as const },
  { id: '2', name: 'Upgrade Button Click', internalName: 'upgrade_button_click', type: 'Element Click' as const, status: 'active' as const, description: 'Show upgrade prompt when user clicks premium feature button', triggers: 802, lastTriggered: '2023-01-12 15:45', page: '/dashboard', selector: 'premium-feature-button', channels: ['Modal', 'Bottomsheet'] as const },
  { id: '3', name: 'Profile Completion Visible', internalName: 'profile_completion_visible', type: 'Element Visible' as const, status: 'active' as const, description: 'Show completion prompt when profile card becomes visible', triggers: 1547, lastTriggered: '2023-01-11 09:15', page: '/profile', selector: '#profile-card', channels: ['Banner', 'Bottomsheet'] as const },
  { id: '4', name: 'Settings Page Load', internalName: 'settings_page_load', type: 'Page Load' as const, status: 'active' as const, description: 'Trigger when user navigates to settings', triggers: 234, lastTriggered: '2023-01-10 16:23', page: '/settings', selector: null, channels: ['Modal', 'Banner', 'Bottomsheet'] as const },
] as const;

export const anchorPoints = [
  { id: '1', name: 'New Feature Button', status: 'active' as const, internalId: 'new_feature_button', description: 'Tooltip anchor for new feature introduction', selector: 'new-feature-btn', position: 'bottom', offset: '8px', usage: 523, page: '/dashboard', lastUsed: '2025-01-12 14:32' },
  { id: '2', name: 'Profile Menu', status: 'active' as const, internalId: 'profile_menu', description: 'Tooltip for profile menu walkthrough', selector: '.profile-dropdown', position: 'bottom-start', offset: '4px', usage: 822, page: '/', lastUsed: '2025-01-12 16:46' },
  { id: '3', name: 'Settings Icon', status: 'active' as const, internalId: 'settings_icon', description: 'Help tooltip for settings access', selector: '[data-settings-icon]', position: 'left', offset: '8px', usage: 1234, page: '/dashboard', lastUsed: '2025-01-11 08:15' },
  { id: '4', name: 'Search Bar', status: 'active' as const, internalId: 'search_bar', description: 'Search feature tutorial tooltip', selector: "input[type='search']", position: 'top', offset: '12px', usage: 445, page: '/campaigns', lastUsed: '2025-01-10 16:35' },
  { id: '5', name: 'Upgrade Badge', status: 'inactive' as const, internalId: 'upgrade_badge', description: 'Premium feature tooltip', selector: '.upgrade-badge', position: 'top-end', offset: '4px', usage: 0, page: '/dashboard', lastUsed: null },
] as const;

export const deeplinkStats = { total: 5, active: 5, totalClicks: 31657, platforms: 1 } as const;

export const deeplinks = [
  { id: '1', name: 'Premium Upgrade Flow', type: 'screen' as const, status: 'active' as const, description: 'Direct link to premium subscription upgrade page', url: 'myapp://premium/upgrade', target: 'Premium Subscription Screen', clicks: 3421, params: ['source=push_notification', 'campaign_id={campaign_id}'], lastUsed: '2025-01-12 14:30' },
  { id: '2', name: 'New Match Notification', type: 'screen' as const, status: 'active' as const, description: 'Opens match detail when user taps notification', url: 'myapp://matches/{match_id}', target: 'Match Detail Screen', clicks: 12847, params: ['match_id={match_id}'], lastUsed: '2025-01-12 16:45' },
  { id: '3', name: 'Promo Code - SPRING25', type: 'promotion' as const, status: 'active' as const, description: 'Applies promo code and opens checkout', url: 'myapp://promo/SPRING25', target: 'Checkout Screen', clicks: 5432, params: ['code=SPRING25'], lastUsed: '2025-01-11 10:20' },
] as const;

export const mediaStats = { totalItems: 8, totalStorage: '12.6 MB', activeCampaigns: 11 } as const;

export const mediaItems = [
  { id: '1', filename: 'hero-banner.png', size: '2.4 MB', dimensions: '1920x1080', campaigns: 2, type: 'image' as const },
  { id: '2', filename: 'promo-icon.svg', size: '128 KB', dimensions: '64x64', campaigns: 5, type: 'icon' as const },
  { id: '3', filename: 'notification-bg.jpg', size: '1.8 MB', dimensions: '1200x800', campaigns: 3, type: 'icon' as const },
  { id: '4', filename: 'feature-highlight.png', size: '3.2 MB', dimensions: '1920x1080', campaigns: 1, type: 'image' as const },
  { id: '5', filename: 'music-note-icon.png', size: '64 KB', dimensions: '48x48', campaigns: 4, type: 'icon' as const },
  { id: '6', filename: 'retro-computer.png', size: '4.1 MB', dimensions: '1600x900', campaigns: 0, type: 'image' as const },
  { id: '7', filename: 'youtube-play.png', size: '96 KB', dimensions: '64x64', campaigns: 2, type: 'icon' as const },
  { id: '8', filename: 'sale-banner.png', size: '2.1 MB', dimensions: '1200x600', campaigns: 6, type: 'image' as const },
] as const;

export const dynamicVarStats = { total: 10, active: 10, totalUsage: 72327, categories: 4 } as const;

export const dynamicVariables = [
  { id: '1', name: 'Universal Footer', tags: ['content', '<html'] as const, description: 'Standard footer with unsubscribe link and company information', syntax: '{{{ universal_footer }}}', example: '<footer> 2025 Company Name | <a>Unsubscribe</a></footer>', channels: ['Email', 'Push', 'Modal', 'SMS', 'Banner'] as const, usage: 3421, lastUsed: '2025-01-12 14:30' },
  { id: '2', name: 'User First Name', tags: ['user', 'As string'] as const, description: 'Personalized greeting with user first name', syntax: '{{{ user.first_name }}}', example: 'Hi John,', channels: ['Email', 'Push', 'Modal'] as const, usage: 12847, lastUsed: '2025-01-12 16:45' },
  { id: '3', name: 'Campaign Name', tags: ['campaign', 'As string'] as const, description: 'Current campaign name for context', syntax: '{{{ campaign.name }}}', example: 'Welcome Series', channels: ['Email', 'Push', 'Modal', 'SMS'] as const, usage: 5432, lastUsed: '2025-01-11 09:15' },
] as const;

export const notificationTabs = [
  { id: 'campaigns', label: 'Campaigns', icon: 'bell' },
  { id: 'journeys', label: 'Journeys', icon: 'flow' },
  { id: 'approval-queue', label: 'Approval Queue', icon: 'checkbox' },
  { id: 'atc-management', label: 'ATC Management', icon: 'settings' },
] as const;

export const journeyStats = {
  totalJourneys: 4,
  liveJourneys: 3,
  activeUsers: '4,476',
  avgCompletion: '46.6%',
} as const;

export const journeys = [
  {
    id: '1',
    name: 'Welcome Onboarding Series',
    status: 'live' as const,
    type: 'Automation' as const,
    steps: 5,
    activeUsers: 1243,
    completion: '78.5%',
    lastModified: '2h ago',
    campaigns: [
      { name: 'Welcome Email', type: 'Email' },
      { name: 'Day 2 Push', type: 'Push' },
      { name: 'Day 5 Feature Modal', type: 'Modal' },
    ],
  },
  {
    id: '2',
    name: 'Cart Abandonment Recovery',
    status: 'live' as const,
    type: 'Automation' as const,
    steps: 4,
    activeUsers: 2341,
    completion: '62.8%',
    lastModified: '1d ago',
    campaigns: [
      { name: 'Cart Reminder Email', type: 'Email' },
      { name: 'Push Notification', type: 'Push' },
    ],
  },
  {
    id: '3',
    name: 'Re-engagement Campaign',
    status: 'draft' as const,
    type: 'Marketing' as const,
    steps: 3,
    activeUsers: 0,
    completion: '0%',
    lastModified: '3d ago',
    campaigns: [],
  },
] as const;

export const pendingApprovals = [
  {
    id: '1',
    title: 'Summer Sale Push Notification',
    priority: 'high' as const,
    type: ['Push', 'Email'] as const,
    description: 'Promotional campaign for summer sale event',
    submittedBy: 'Emily Rodriguez',
    submittedAt: '2 hours ago',
    estimatedReach: '125,000 users',
  },
  {
    id: '2',
    title: 'Product Feature Announcement',
    priority: 'medium' as const,
    type: ['Modal', 'Email'] as const,
    description: 'Announcing new feature launch to active users',
    submittedBy: 'Michael Chen',
    submittedAt: '5 hours ago',
    estimatedReach: '500,000 users',
  },
  {
    id: '3',
    title: 'Weekend Newsletter',
    priority: 'low' as const,
    type: ['Email'] as const,
    description: 'Weekly content digest for subscribers',
    submittedBy: 'Emily Rodriguez',
    submittedAt: '1 day ago',
    estimatedReach: '800,000 users',
  },
] as const;

export const rateLimitChannels = [
  { channel: 'Push', current: 3421, total: 5000, percent: 68, icon: 'bell' },
  { channel: 'Email', current: 2145, total: 3000, percent: 72, icon: 'envelope' },
  { channel: 'SMS', current: 456, total: 1000, percent: 46, icon: 'sms' },
  { channel: 'In-App', current: 1212, total: 15000, percent: 8, icon: 'window' },
] as const;

export const configuredRateLimits = [
  { id: '1', channel: 'Push', subChannel: 'Transactional/Evergreen', category: 'Global', perHour: 2000, perDay: 28000, perWeek: 100000 },
  { id: '2', channel: 'Push', subChannel: 'Transactional/Evergreen', category: 'MATCH', perHour: 500, perDay: 5000, perWeek: 25000 },
  { id: '3', channel: 'Push', subChannel: 'Product Marketing', category: 'Global', perHour: 1000, perDay: 10000, perWeek: 50000 },
  { id: '4', channel: 'Email', subChannel: 'Marketing', category: 'Global', perHour: 500, perDay: 3000, perWeek: 15000 },
  { id: '5', channel: 'SMS', subChannel: 'Alerts', category: 'Global', perHour: 200, perDay: 1000, perWeek: 5000 },
] as const;

export const monitoringTabs = [
  { id: 'campaign-metrics', label: 'Campaign Metrics', icon: 'chart-line' },
  { id: 'experiments', label: 'Experiments', icon: 'flask' },
  { id: 'user-lookup', label: 'User Lookup', icon: 'person' },
  { id: 'audience-overlap', label: 'Audience Overlap', icon: 'people-overlap' },
] as const;

export const experimentStats = {
  totalExperiments: 3,
  runningTests: 3,
  totalParticipants: '45,000',
  avgConversionRate: '10.0%',
} as const;

export const experiments = [
  {
    id: '1',
    name: 'A/B Test: New Feature Alert',
    status: 'running' as const,
    type: 'A/B Test' as const,
    startDate: 'Jan 1, 2026',
    endDate: 'Jan 31, 2028',
    participants: 10000,
    controlGroup: 5000,
    testGroup: 5000,
    openRate: '45.0%',
    outcome: 'success' as const,
    outcomeMessage: 'Test group is showing a 20% higher open rate compared to the control group.',
  },
  {
    id: '2',
    name: 'Multivariate: Push Copy Test',
    status: 'running' as const,
    type: 'Multivariate Test' as const,
    startDate: 'Dec 15, 2025',
    endDate: 'Feb 28, 2026',
    participants: 15000,
    controlGroup: 7500,
    testGroup: 7500,
    openRate: '38.0%',
    outcome: 'warning' as const,
    outcomeMessage: 'Test group is showing a 10% lower open rate compared to the control group.',
  },
  {
    id: '3',
    name: 'A/B Test: Subject Line Variants',
    status: 'running' as const,
    type: 'A/B Test' as const,
    startDate: 'Jan 10, 2026',
    endDate: 'Mar 15, 2026',
    participants: 20000,
    controlGroup: 10000,
    testGroup: 10000,
    openRate: '52.0%',
    outcome: 'success' as const,
    outcomeMessage: 'Test group is showing a 25% higher open rate compared to the control group.',
  },
] as const;

export const audienceOverlapStats = {
  liveCampaigns: 6,
  totalUniqueUsers: '126,639',
  avgMessagesPerUserPerWeek: '1.6',
  highOverlapPairs: 1,
} as const;

export const audienceOverlapCampaigns = [
  { id: '1', name: 'Welcome Email Series', description: 'New Users (7 days) - 12,000 users' },
  { id: '2', name: 'Cart Abandonment Push', description: 'Cart abandoners - 8,500 users' },
  { id: '3', name: 'Weekly Newsletter', description: 'Subscribers - 45,390 users' },
  { id: '4', name: 'Product Launch Modal', description: 'Active users - 21,844 users' },
  { id: '5', name: 'Re-engagement Email', description: 'Inactive 30d - 15,200 users' },
] as const;

/** Overlap matrix: [rowIndex][colIndex] => { percent, count } or null for diagonal */
export const audienceOverlapMatrix: (null | { percent: number; count: number })[][] = [
  [null, { percent: 12, count: 1200 }, { percent: 47, count: 5640 }, { percent: 18, count: 2160 }, { percent: 6, count: 720 }],
  [{ percent: 14, count: 1190 }, null, { percent: 21, count: 1785 }, { percent: 8, count: 680 }, { percent: 41, count: 3485 }],
  [{ percent: 47, count: 21333 }, { percent: 21, count: 9532 }, null, { percent: 30, count: 13617 }, { percent: 14, count: 6355 }],
  [{ percent: 18, count: 3932 }, { percent: 8, count: 1748 }, { percent: 30, count: 6553 }, null, { percent: 8, count: 1748 }],
  [{ percent: 6, count: 912 }, { percent: 41, count: 6232 }, { percent: 14, count: 2128 }, { percent: 8, count: 1216 }, null],
];

export const roles = [
  { id: 'admin', name: 'Admin', description: 'Full access to all features including user management', color: 'purple' },
  { id: 'campaign-manager', name: 'Campaign Manager', description: 'Can create and manage campaigns, save segments', color: 'blue' },
  { id: 'editor', name: 'Editor', description: 'Can create campaigns but requires approval', color: 'green' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to campaigns and analytics', color: 'gray' },
] as const;

export const permissions = [
  'CREATE CAMPAIGNS',
  'SAVE SEGMENTS',
  'APPROVE QA',
  'EDIT DATA SOURCES',
  'MANAGE USERS',
  'VIEW ANALYTICS',
  'EXPORT DATA',
  'MANAGE INTEGRATIONS',
] as const;

export const rolePermissions: Record<string, Record<string, boolean>> = {
  admin: {
    'CREATE CAMPAIGNS': true,
    'SAVE SEGMENTS': true,
    'APPROVE QA': true,
    'EDIT DATA SOURCES': true,
    'MANAGE USERS': true,
    'VIEW ANALYTICS': true,
    'EXPORT DATA': true,
    'MANAGE INTEGRATIONS': true,
  },
  'campaign-manager': {
    'CREATE CAMPAIGNS': true,
    'SAVE SEGMENTS': true,
    'APPROVE QA': false,
    'EDIT DATA SOURCES': false,
    'MANAGE USERS': false,
    'VIEW ANALYTICS': true,
    'EXPORT DATA': true,
    'MANAGE INTEGRATIONS': false,
  },
  editor: {
    'CREATE CAMPAIGNS': true,
    'SAVE SEGMENTS': false,
    'APPROVE QA': false,
    'EDIT DATA SOURCES': false,
    'MANAGE USERS': false,
    'VIEW ANALYTICS': true,
    'EXPORT DATA': false,
    'MANAGE INTEGRATIONS': false,
  },
  viewer: {
    'CREATE CAMPAIGNS': false,
    'SAVE SEGMENTS': false,
    'APPROVE QA': false,
    'EDIT DATA SOURCES': false,
    'MANAGE USERS': false,
    'VIEW ANALYTICS': true,
    'EXPORT DATA': false,
    'MANAGE INTEGRATIONS': false,
  },
} as const;

export const teamMembers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', roleId: 'admin' as const, lastActive: '2 hours ago' },
  { id: '2', name: 'Michael Chen', email: 'michael.chen@company.com', roleId: 'campaign-manager' as const, lastActive: '6 minutes ago' },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', roleId: 'editor' as const, lastActive: '1 day ago' },
  { id: '4', name: 'David Kim', email: 'david.kim@company.com', roleId: 'campaign-manager' as const, lastActive: '3 hours ago' },
  { id: '5', name: 'Alex Thompson', email: 'alex.thompson@company.com', roleId: 'viewer' as const, lastActive: '5 days ago' },
] as const;

/** Role ID -> user count for Role Definitions cards */
export const roleUserCounts: Record<string, number> = {
  admin: 1,
  'campaign-manager': 2,
  editor: 1,
  viewer: 1,
};

export const dashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'user-behavior', label: 'User Behavior' },
  { id: 'performance', label: 'Performance' },
  { id: 'flows', label: 'Flows' },
] as const;

export const flowsKpis = [
  { id: '1', label: 'Conversion Rate', value: '12.4%', change: 2.1, trend: 'up' as const, compare: 'vs last month' },
  { id: '2', label: 'Drop-off at Checkout', value: '34%', change: 3.2, trend: 'down' as const, compare: 'vs last month' },
  { id: '3', label: 'Avg. Journey Steps', value: '4.2', change: 0.3, trend: 'up' as const, compare: 'vs last month' },
  { id: '4', label: 'Completed Purchases', value: '2,847', change: 18.5, trend: 'up' as const, compare: 'vs last month' },
] as const;

/** User journey / conversion flow for Network Graph */
export const conversionFlowData = {
  nodes: [
    { id: 1, label: 'Landing', title: 'User lands on site' },
    { id: 2, label: 'Browse', title: 'Browse products or content' },
    { id: 3, label: 'Sign Up', title: 'Create account' },
    { id: 4, label: 'Onboard', title: 'Complete onboarding' },
    { id: 5, label: 'First Action', title: 'First meaningful action' },
    { id: 6, label: 'Cart', title: 'Add to cart' },
    { id: 7, label: 'Checkout', title: 'Proceed to checkout' },
    { id: 8, label: 'Purchase', title: 'Complete purchase' },
    { id: 9, label: 'Churn', title: 'User left / inactive' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 2, to: 6 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 9 },
    { from: 5, to: 6 },
    { from: 5, to: 9 },
    { from: 6, to: 7 },
    { from: 6, to: 9 },
    { from: 7, to: 8 },
    { from: 7, to: 9 },
  ],
};

export const overviewKpis = [
  { id: '1', label: 'Unique Visitors', value: '23,876', change: 24.5, trend: 'up' as const, compare: 'Compare to last week' },
  { id: '2', label: 'Page View', value: '30,450', change: 20.5, trend: 'up' as const, compare: 'Compare to last week' },
  { id: '3', label: 'Events', value: '34,789', change: 20.5, trend: 'down' as const, compare: 'Compare to last week' },
  { id: '4', label: 'Live Visitor', value: '45,687', change: 24.5, trend: 'up' as const, compare: 'Compare to last week' },
] as const;

export const analysisChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    { name: 'Page View', values: [420, 580, 720, 680, 820, 750, 890, 920, 850, 980, 910, 1000] },
    { name: 'Unique Visitor', values: [280, 350, 420, 380, 480, 450, 520, 580, 510, 620, 590, 680] },
  ],
};

export const topReferrers = [
  { label: 'Direct', value: 16890 },
  { label: 'Google.com', value: 12450 },
  { label: 'Remix.com', value: 8920 },
  { label: 'dev.to', value: 6540 },
  { label: 'acpc.api.ic.io', value: 3210 },
  { label: 'wewe.uv.us', value: 1890 },
];

export const topReferrersChartData = {
  labels: topReferrers.map((s) => s.label),
  datasets: [{ name: 'Traffic', values: topReferrers.map((s) => s.value) }],
};

export const topPages = [
  { label: 'Home', value: 24500 },
  { label: 'Pricing', value: 18200 },
  { label: 'Change-log', value: 12400 },
  { label: 'Feature', value: 9800 },
  { label: 'Service', value: 7600 },
  { label: 'About', value: 5400 },
];

export const topPagesChartData = {
  labels: topPages.map((s) => s.label),
  datasets: [{ name: 'Views', values: topPages.map((s) => s.value) }],
};

export const topSources = [
  { label: 'No-Reference', value: 18900 },
  { label: 'Medium', value: 12400 },
  { label: 'remaixblock.com', value: 8200 },
  { label: 'remaix-pge-block-hero', value: 5600 },
  { label: 'remaix-pge-block-banner', value: 3400 },
  { label: 'dev.io', value: 2100 },
];

export const topSourcesChartData = {
  labels: topSources.map((s) => s.label),
  datasets: [{ name: 'Traffic', values: topSources.map((s) => s.value) }],
};

export const userBehaviorKpis = [
  { id: '1', label: 'Total Users', value: '23,876', change: 24.5, trend: 'up' as const, compare: 'vs last month' },
  { id: '2', label: 'New Users', value: '30,450', change: 20.5, trend: 'up' as const, compare: 'vs last month' },
  { id: '3', label: 'Current Users', value: '34,789', change: 20.5, trend: 'down' as const, compare: 'vs last month' },
] as const;

export const userOverviewData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    { name: 'Active User', values: [520, 800, 650, 720, 680, 750, 620, 780, 710, 820, 760, 850] },
    { name: 'Inactive User', values: [380, 700, 520, 580, 540, 620, 480, 650, 590, 680, 610, 720] },
  ],
};

export const userTransactions = [
  { id: '1', user: 'Stacy Reichel', amount: '$199.00', status: 'Success' as const, date: '14 May 2024 5:00 PM' },
  { id: '2', user: 'Roderi Rohan', amount: '$267.00', status: 'Success' as const, date: '12 Jan 2024 3:45 PM' },
  { id: '3', user: 'Audrey Leffler', amount: '$389.00', status: 'Cancel' as const, date: '04 Apr 2024 10:30 AM' },
  { id: '4', user: 'Allison Mose', amount: '$199.00', status: 'Success' as const, date: '14 May 2024 11:40 AM' },
];

/** Traffic by device - pie chart (part-to-whole: % of traffic per device) */
export const trafficByDevice = {
  labels: ['Computer', 'Mobile', 'Tablet'],
  datasets: [{ values: [55, 35, 10] }],
};

export const performanceKpis = [
  { id: '1', label: 'Sales', value: '$9140.20', target: '$8295.50', percent: 110, trend: 'up' as const },
  { id: '2', label: 'Profit', value: '$4593.35', target: '$4492.25', percent: 102, trend: 'up' as const },
  { id: '3', label: 'Order', value: '23,876k', target: '24,926k', percent: 96, trend: 'down' as const },
] as const;

export const salesGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    { name: 'Sales Growth', values: [12000, 15000, 18000, 19500, 21000, 22500, 23500, 24500, 23000, 25500, 26000, 26800] },
    { name: 'Target', values: [10000, 12000, 15000, 17000, 18500, 20000, 21000, 20000, 22000, 24000, 25000, 26000] },
  ],
};

export const bounceRateSources = [
  { label: 'Direct', value: 16890 },
  { label: 'Search', value: 4909 },
  { label: 'Social', value: 550 },
  { label: 'Ads', value: 140 },
  { label: 'Mail', value: 8675 },
  { label: 'Links', value: 4900 },
];

/** Chart data for Bounce Rate bar chart */
export const bounceRateChartData = {
  labels: bounceRateSources.map((s) => s.label),
  datasets: [{ name: 'Traffic', values: bounceRateSources.map((s) => s.value) }],
};

/** Sales by country/region for Sale Mapping chart */
export const salesByCountryData = {
  labels: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Ohio', 'Georgia', 'North Carolina'],
  datasets: [{ name: 'Orders', values: [4200, 3800, 3100, 2800, 2100, 1900, 1650, 1420] }],
};

export const totalRevenueData = {
  labels: ['Revenue', 'Remaining'],
  datasets: [{ values: [75, 25] }],
};

export const suggestedActions = [
  { id: '1', label: 'Create a push notification campaign', icon: 'plus' },
  { id: '2', label: 'Check campaign performance', icon: 'chart-bar' },
  { id: '3', label: 'Build a new audience segment', icon: 'users' },
  { id: '4', label: 'Set up an event trigger', icon: 'lightning' },
] as const;
