package co.betafocus.heal.feedback

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.call
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.post

fun Route.feedbackRoutes(service: FeedbackService) {
    post("/send-feedback") {
        val payload = call.receive<SendFeedbackRequestDto>()

        runCatching { service.submit(payload) }
            .onSuccess {
                call.respond(
                    HttpStatusCode.Accepted,
                    SendFeedbackResponse()
                )
            }
            .onFailure { throwable ->
                when (throwable) {
                    is FeedbackValidationException -> call.respond(
                        HttpStatusCode.BadRequest,
                        FeedbackErrorResponse(
                            throwable.message ?: "Invalid feedback request."
                        )
                    )

                    else -> {
                        throwable.printStackTrace()
                        call.respond(
                            HttpStatusCode.InternalServerError,
                            FeedbackErrorResponse("Failed to submit feedback. Please try again.")
                        )
                    }
                }
            }
    }
}
