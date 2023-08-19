package main

import "net/http"

func main() {
	// TODO(#2): This issue is still open.
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!\n"))
	})
	http.ListenAndServe(":8080", nil)
}
