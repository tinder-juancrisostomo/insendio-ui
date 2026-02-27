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

export const notificationTabs = [
  { id: 'campaigns', label: 'Campaigns', icon: 'bell' },
  { id: 'journeys', label: 'Journeys', icon: 'flow' },
  { id: 'approval-queue', label: 'Approval Queue', icon: 'checkbox' },
  { id: 'atc-management', label: 'ATC Management', icon: 'settings' },
] as const;

export const monitoringTabs = [
  { id: 'campaign-metrics', label: 'Campaign Metrics', icon: 'chart-line' },
  { id: 'experiments', label: 'Experiments', icon: 'flask' },
  { id: 'user-lookup', label: 'User Lookup', icon: 'person' },
  { id: 'audience-overlap', label: 'Audience Overlap', icon: 'people-overlap' },
] as const;

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

export const suggestedActions = [
  { id: '1', label: 'Create a push notification campaign', icon: 'plus' },
  { id: '2', label: 'Check campaign performance', icon: 'chart-bar' },
  { id: '3', label: 'Build a new audience segment', icon: 'users' },
  { id: '4', label: 'Set up an event trigger', icon: 'lightning' },
] as const;
