import type { BranchData } from 'data/branches/branch-query'
import type { Branch } from 'data/branches/branches-query'
import { Badge_Shadcn_ } from 'ui'
import { StatusIcon } from 'ui-patterns/Icons/StatusIcons'

type Status = Branch['status'] | BranchData['status']

export interface BranchStatusBadgeProps {
  status: Status
}

const UNHEALTHY_STATUES: Status[] = [
  'ACTIVE_UNHEALTHY',
  'INIT_FAILED',
  'UNKNOWN',
  'MIGRATIONS_FAILED',
]
const WAITING_STATUSES: Status[] = [
  'COMING_UP',
  'GOING_DOWN',
  'PAUSING',
  'RESTORING',
  'UPGRADING',
  'RUNNING_MIGRATIONS',
]

const STATUS_TO_LABEL: Record<Status, string> = {
  ACTIVE_HEALTHY: 'Healthy',
  ACTIVE_UNHEALTHY: 'Unhealthy',
  INIT_FAILED: 'Init failed',
  UNKNOWN: 'Unknown',
  COMING_UP: 'Coming up',
  GOING_DOWN: 'Going down',
  INACTIVE: 'Inactive',
  PAUSING: 'Pausing',
  REMOVED: 'Removed',
  RESTORING: 'Restoring',
  UPGRADING: 'Upgrading',
  CREATING_PROJECT: 'Creating project',
  RUNNING_MIGRATIONS: 'Running migrations',
  MIGRATIONS_FAILED: 'Migrations failed',
  MIGRATIONS_PASSED: 'Migrations applied successfully',
}

const BranchStatusBadge = ({ status }: BranchStatusBadgeProps) => {
  if (status === 'ACTIVE_HEALTHY' || status === 'MIGRATIONS_PASSED') {
    return null
  }

  const isUnhealthy = UNHEALTHY_STATUES.includes(status)
  const isWaiting = WAITING_STATUSES.includes(status)

  return (
    <Badge_Shadcn_ variant={isUnhealthy ? 'destructive' : 'default'} className="gap-1.5">
      {(isUnhealthy || isWaiting) && (
        <StatusIcon variant={isUnhealthy ? 'destructive' : 'default'} hideBackground />
      )}
      {STATUS_TO_LABEL[status]}
    </Badge_Shadcn_>
  )
}

export default BranchStatusBadge
