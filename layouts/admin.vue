<script lang="ts" setup>
import { ADMIN_MENU } from '~/constants/menu'

definePageMeta({
  middleware: [async function (to) {
    if (to.path !== '/lac-xi') {
      return await navigateTo('/lac-xi')
    }
  }],
})
const route = useRoute()

const orgStore = useOrgStore()
const { status, error } = useLazyAsyncData(orgStore.fetchOrgs)
watchError(error)

const activeRoute = computed(() =>
  Object.values(ADMIN_MENU).find(item => typeof route.name === 'string' && route.name.includes(item.to.name)),
)
</script>

<template>
  <SidebarProvider class="relative">
    <div v-if="status === 'pending'" class="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 flex justify-center items-center z-[99999] rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="animate-spin w-10 h-10"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>

    <template v-else>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarOrgSwitcher />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in ADMIN_MENU" :key="item.title">
                  <SidebarMenuButton
                    as-child
                    :is-active="route.name === item.to.name"
                    :tooltip="item.title"
                  >
                    <NuxtLink class="block" :to="item.to">
                      <Icon
                        :name="item.icon"
                        class="min-w-[18px]"
                        mode="css"
                        size="18"
                      />
                      {{ item.title }}
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavUser />
        </SidebarFooter>
      </Sidebar>

      <main class="relative flex flex-col flex-1 min-h-svh">
        <header
          class="sticky top-0 bg-white z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class-name="hidden md:block">
                  <BreadcrumbLink href="#">
                    {{ activeRoute?.title }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="p-8 flex-1">
          <slot />
        </div>
      </main>
    </template>
  </SidebarProvider>
</template>
