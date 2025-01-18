<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="h-full w-full" variant="ghost">
        <Icon
          name="tabler-trophy"
          class="min-w-[32px]"
          mode="css"
          size="32"
        />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogTitle class="sr-only">
        Reward Popup
      </DialogTitle>

      <Table>
        <TableCaption>Trao niềm tin, nhận tài lộc</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Giải</TableHead>
            <TableHead>Giá trị</TableHead>
            <TableHead>Tỉ lệ</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>1st</TableCell>
            <TableCell>100.000VND</TableCell>
            <TableCell>1%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2nd</TableCell>
            <TableCell>50.000VND</TableCell>
            <TableCell>5%</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>3rd</TableCell>
            <TableCell>20.000VND</TableCell>
            <TableCell>10%</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>4th</TableCell>
            <TableCell>10.000VND</TableCell>
            <TableCell>30%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogContent>
  </Dialog>
</template>
