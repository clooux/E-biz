package com.example

import com.aallam.openai.api.BetaOpenAI
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*


suspend fun main() {
    val token = System.getenv("gpt_token")
    val openai = OpenAI(
        token = token,
    )

    embeddedServer(Netty, port = 8080) {
        gptService(openai)
    }.start(wait = false)

}


@OptIn(BetaOpenAI::class)
fun Application.gptService(openai: OpenAI) {
    routing {
        get("/ask-gpt") {
            val completion = openai.chatCompletion(
                ChatCompletionRequest(
                    model = ModelId("gpt-3.5-turbo"),
                    messages = listOf(
                        ChatMessage(
                            role = ChatRole.System,
                            content = "This is ChatGPT. Ask me any question"
                        ),
                        ChatMessage(
                            role = ChatRole.User,
                            content = "What is ChatGPT?"
                        )
                    )
                )
            )

            completion.choices.forEach(::println)
        }
    }
}

fun Application.module() {
    configureSerialization()
    configureSockets()
    configureRouting()
}
