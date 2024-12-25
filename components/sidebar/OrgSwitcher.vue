<script lang="ts" setup>
import { useSidebar } from '../ui/sidebar'

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" size="lg">
            <Icon
              name="tabler-square-letter-s-filled"
              class="min-w-[32px]"
              mode="css"
              size="32"
            />
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                S-Group
              </span>
              <span class="truncate text-xs">Free</span>
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
          <DropdownMenuLabel>
            Organization
          </DropdownMenuLabel>

          <DropdownMenuItem class="gap-2 p-2 cursor-pointer">
            <Icon
              name="tabler-square-letter-s-filled"
              class="min-w-[18px]"
              mode="css"
              size="28"
            />
            S-Group
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem class="gap-2 p-2 cursor-pointer" @click="notifyUnderConstruction">
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Icon name="tabler-plus" size="18" class="text-primary" />
            </div>
            <div class="font-medium text-muted-foreground">
              Add team
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
