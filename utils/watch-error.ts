export function watchError<T>(source: Ref<T>) {
  watch(source, (error) => {
    if (error) {
      notifyError((error as any).message || error)
    }
  })
}
