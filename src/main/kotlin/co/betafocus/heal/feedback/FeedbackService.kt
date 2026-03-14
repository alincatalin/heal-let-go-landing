package co.betafocus.heal.feedback

class FeedbackService(
    private val dataSource: FeedbackDataSource
) {
    suspend fun submit(request: SendFeedbackRequestDto): FeedbackRecord {
        val title = request.title.trim()
        val description = request.description.trim()
        val platform = request.platform.trim()
        val userId = request.userId.trim()

        validate(title, description, platform, userId)

        return dataSource.create(
            FeedbackRecord(
                title = title,
                description = description,
                platform = platform,
                userId = userId
            )
        )
    }

    private fun validate(
        title: String,
        description: String,
        platform: String,
        userId: String
    ) {
        if (title.isBlank() || title.length > 200) {
            throw FeedbackValidationException("Title must be between 1 and 200 characters.")
        }
        if (description.isBlank() || description.length > 5_000) {
            throw FeedbackValidationException("Description must be between 1 and 5000 characters.")
        }
        if (platform.isBlank() || platform.length > 100) {
            throw FeedbackValidationException("Platform must be between 1 and 100 characters.")
        }
        if (userId.isBlank() || userId.length > 200) {
            throw FeedbackValidationException("User id must be between 1 and 200 characters.")
        }
    }
}

class FeedbackValidationException(message: String) : IllegalArgumentException(message)
