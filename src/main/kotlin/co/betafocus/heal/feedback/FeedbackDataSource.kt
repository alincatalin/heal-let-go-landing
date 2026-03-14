package co.betafocus.heal.feedback

import co.betafocus.heal.chat.supabase.SupabaseClient
import io.ktor.client.call.body
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

class FeedbackDataSource(
    private val client: SupabaseClient
) {
    suspend fun create(record: FeedbackRecord): FeedbackRecord =
        client.post(
            path = TABLE,
            body = listOf(record)
        ).body<List<FeedbackRecord>>().first()

    companion object {
        private const val TABLE = "feedback"
    }
}

@Serializable
data class FeedbackRecord(
    val title: String,
    val description: String,
    val platform: String,
    @SerialName("user_id")
    val userId: String
)
