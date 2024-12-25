<script lang="ts" setup>
import { useSidebar } from '../ui/sidebar'

const { isMobile } = useSidebar()
const user = useCurrentUser()
const authStore = useAuthStore()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg">
            <Avatar class="size-8 rounded-lg">
              <AvatarImage
                :src="user?.photoURL as string || ''"
                :alt="user?.displayName || ''"
              />
              <AvatarFallback>
                <Icon name="tabler-user" size="24" class="text-primary" />
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ user?.displayName }}
              </span>
              <span class="truncate text-xs">
                {{ user?.email }}
              </span>
            </div>
            <Icon
              name="tabler-caret-up-down"
              class="min-w-[16px]"
              mode="css"
              size="16"
            />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="size-8 rounded-lg">
                <AvatarImage
                  :src="user?.photoURL as string || ''"
                  :alt="user?.displayName || ''"
                />
                <AvatarFallback>
                  <Icon name="tabler-user" size="24" class="text-primary" />
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">
                  {{ user?.displayName }}
                </span>
                <span class="truncate text-xs">
                  {{ user?.email }}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-2 p-2 cursor-pointer" @click="notifyUnderConstruction">
              <Icon name="tabler-sparkles" size="18" class="text-primary" />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-2 p-2 cursor-pointer" @click="notifyUnderConstruction">
              <Icon name="tabler-rosette-discount-check" size="18" class="text-primary" />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem class="gap-2 p-2 cursor-pointer" @click="notifyUnderConstruction">
              <Icon name="tabler-credit-card" size="18" class="text-primary" />
              Billing
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-2 p-2 cursor-pointer" @click="authStore.logout">
              <Icon name="tabler-logout" size="18" class="text-primary" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
