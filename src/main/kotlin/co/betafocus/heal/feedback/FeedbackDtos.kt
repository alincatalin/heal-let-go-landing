package co.betafocus.heal.feedback

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SendFeedbackRequestDto(
    val title: String,
    val description: String,
    val platform: String,
    @SerialName("user_id")
    val userId: String
)

@Serializable
data class SendFeedbackResponse(
    val message: String = "Feedback submitted successfully."
)

@Serializable
data class FeedbackErrorResponse(
    val error: String
)
