import { BaseApi } from '@/lib/api/BaseApi'
import Job from '@/types/Job'
import { JobService } from './JobService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<Job, Job>()
export const jobService = new JobService(baseApi)
export const jobQueryService = new ResourceQueryService('job', jobService)
